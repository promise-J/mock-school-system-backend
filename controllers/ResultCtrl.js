const fs = require("fs");
const path = require("path");
const ejs = require("ejs");

const puppeteer = require("puppeteer");
const mongoose = require("../services/mongoose");

const { Result } = require("../models/Result.model");
const { ResultItem } = require("../models/ResultItem.model");
const { User } = require("../models/User.model");
const { Role, TermValues } = require("../constants/constansts");
const { Scratch } = require("../models/Scratch.model");
const config = require("../config");
const { Session } = require("../models/Session.model");
const { Class: UserClass } = require("../models/Class.model");

const resultCtrl = {
  getResult: async (req, res) => {
    const user = req.user;
    // const scratchCard = req.session.card;
    // const accessTime = req.session.accessTime;
    const scratchCard = req.card;
    const accessTime = req.accessTime;

    try {
      const result = await Result.findById(req.params.resultId).populate(
        "student"
      );
      if (!result) return res.status(400).json("No result with given params");

      if (user.role == Role.STUDENT) {
        /**
         * Student can view a result for max 30mins after that, authentication will be needed again
         */
        const isSessionExpired =
          new Date().getTime() - new Date(accessTime).getTime() >
          config.app.maxCardAcessTime;

        if (isSessionExpired) {
          req.card = null
          req.accessTime = null
          req.userId = null
          return res.status(400).json({ msg: "Invalid Authorization" });
        }
      } else if (user.role === Role.TEACHER) {
        const classIdOfResult = result.student.class;
        if (!user.class._id.equals(classIdOfResult)) {
          return res.status(403).json("Permission denied");
        }
      }
      await result.populate([
        {
          path: "items",
          populate: {
            path: "subject",
          },
        },
        {
          path: "student",
          populate: {
            path: "class",
          },
        },
        "session",
      ]);

      return res.status(200).json({ card: scratchCard, result });
    } catch (error) {
      // console.log(error);
      return res.status(500).json(error);
    }
  },
  authenticate: async (req, res) => {
    try {
      //this is the scratch card update logic
      const { term, session, card, user } = req.body;
      if (!card || !user || !term || !session)
        return res.status(400).json("Fields must be present");
      if (!TermValues.includes(term))
        return res.status(400).json("Invalid term");

      const student = await User.findOne({
        loginID: user,
        role: Role.STUDENT,
      });
      if (!student) return res.status(400).json("Student not Found");
      const result = await Result.findOne({ session, term, student });
      if (!result) return res.status(400).json("No result with given params");

      const scratchCard = await Scratch.findOne({ card }).populate("user");

      if (!scratchCard) return res.status(400).json("Card does not exist");
      if (scratchCard.usageCount >= config.app.maxCardUsageCount) {
        return res
          .status(400)
          .json(
            "Card has reach the maximum use. This will no longer be available"
          );
      }

      if (scratchCard.user && !scratchCard.user.equals(student.id))
        return res
          .status(400)
          .json("This card has already been used by another User");

      if (scratchCard.result && !scratchCard.result.equals(result.id))
        return res.status(400).json("This card is assigned to another result");
      scratchCard.usageCount += 1;
      scratchCard.user = student.id;
      scratchCard.result = result.id;
      await scratchCard.save();

      req.userId = student.id;
      req.accessTime = new Date();
      req.card = scratchCard;
      // await req.session.save();

      return res.status(200).json({ user: student, resultId: result.id });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  createResult: async (req, res) => {
    try {
      let resultArr = [];
      const { term, studentId, session } = req.body;
      if (!term || !studentId || !session)
        return res.status(400).json({ msg: "Complete all fields" });
      const student = await User.findById(studentId).populate("class");

      const existingResult = await Result.findOne({
        student: studentId,
        term,
        session,
      });

      if (
        req.user.role === Role.SUPERUSER ||
        req.user.class.equals(student.class.id)
      ) {
        // const existTerm = await Result.findOne({ term });
        // const existSession = await Result.findOne({ session });
        if (existingResult)
          return res.status(400).json({ msg: "Result already exists" });

        student.class.subjects.forEach(async (s) => {
          resultArr.push({ student: studentId, subject: s._id });
        });

        const items = await ResultItem.insertMany(resultArr);
        const result = await new Result({
          student: studentId,
          term,
          session,
          items,
        }).save();
        return res.status(200).json({ msg: "Result Created" });
      } else {
        return res.status(403).json({ msg: "Forbidden" });
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  deleteResult: async (req, res) => {
    try {
      const { resultId: _id } = req.params;
      await Result.findOneAndDelete({ _id });
      res.status(200).json("Result deleted.");
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  allResult: async (req, res) => {
    /**
     * tHIS IS SAMPLE FILTER for result
     * http://localhost:5000/result?page=&year=2021&term=third&name=dapo
     */
    try {
      // let allResult;
      const allSessions = await Session.find()
      const recentYear = allSessions[allSessions.length - 1].year
      // const sessionCount = allSessions.countDocuments()


      const page =
        !req.query.page || Number(req.query.page) <= 0
          ? 1
          : Number(req.query.page);

      const year = req.query.year;

      let sessionId;
      if (year) {
        const session = await Session.findOne({ year: Number(year) });
        sessionId = session && session.id;
      }

      const term = TermValues.includes(req.query.term) && req.query.term;
      const studentName = req.query.name && req.query.name.toLowerCase();
      // This LIMIT can be increased to any number
      const limit = 10;
      const zeroPageIndex = page - 1;
      const skip = limit * zeroPageIndex;

      // console.log(studentName)

      const students = await User.find({
        role: Role.STUDENT,

        ...(studentName && {
          $or: [
            { firstName: studentName },
            { lastName: studentName },
            { middleName: studentName },
          ],
        }),

        ...(req.user.role !== Role.SUPERUSER && { class: req.user.class }),
      }).distinct("_id");


      const ResultQuery = Result.find({
        ...(term && { term }),
        ...(year && { session: sessionId }),
        student: {
          $in: students,
        },
      }).sort({
        updatedAt: -1,
      });


      const [total, results] = await Promise.all([
        Result.find().merge(ResultQuery).countDocuments(),
        ResultQuery.skip(skip)
          .limit(limit)
          .populate(["items", "session", "student"]),
      ]);

      return res.status(200).json({
        pagination: {
          total: total,
          page: page,
          limit,
          startIndex: zeroPageIndex * limit,
          pagesCount: Math.ceil(total / limit),
        },
        results,
        recentYear
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  downloadPdf: async (req, res) => {
    const result = await Result.findById(req.params.resultId).populate([
      "student",
      "session",
      { path: "items", populate: ["subject"] },
    ]);
    if (!result) return res.status(400).json("No result with given params");

    const templatePath = path.resolve(__dirname, "../template/template.html");

    /**Pupeteer */
    const HTML = fs.readFileSync(templatePath, {
      encoding: "utf8",
      flag: "r",
    });
    const HTMLResult = ejs.render(HTML, {
      result,
    });
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(HTMLResult);

    const pdfStream = await page.createPDFStream();
    pdfStream.pipe(res);
    pdfStream.on("end", async () => {
      res.end();
      await browser.close();
    });
  },
};

module.exports = resultCtrl;
