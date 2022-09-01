const { User } = require("../models/User.model");
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt");
const sendMail = require('../utils/sendMail')

const { Session } = require("../models/Session.model");
const { Role } = require("../constants/constansts");
const { Class } = require("../models/Class.model");

const userCtrl = {
  getUser: async (req, res) => {
    try {
      const { userId: _id } = req.params;
      const user = await User.findById(_id)
        .select("-password")
        .populate("class");
      if (!user) return res.status(400).json("User not found");
      res.status(200).json(user);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  getAllUsers: async (req, res) => {
    try {
      // const otherRoles = ["teacher", "student"];
      let users;
      const currentUser = await User.findById(req.user.id);
      if (currentUser.role == "superuser") {
        users = await User.find({
          role: {
            $nin: ["superuser"],
          },
        }).populate("class");
        return res.status(200).json(users);
      }
      users = await User.find({ class: currentUser.class }).populate("class");
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  createUser: async (req, res) => {
    try {
      const { password, role, middleName, firstName, lastName } = req.body;

      // INouts Validation (move to its own side)
      if (!role) return res.status(400).json({ msg: "Fields must not empty" });
      if ((!password || !req.body.loginID) && role === Role.TEACHER) {
        return res.status(400).json({ msg: "Fields must not empty" });
      }
      // if (!req.body.classId && req.user.role === Role.SUPERUSER) {
      //   return res.status(400).json({ msg: "Fields must not empty" });
      // }

      const canCreate =
        (role === Role.STUDENT && req.user.role === Role.TEACHER) ||
        (role === Role.TEACHER && req.user.role === Role.SUPERUSER) ||
        req.user.role === Role.SUPERUSER;

      if (!canCreate) {
        return res.status(403).json({ msg: "Permission denied" });
      }

      const existingUser = await User.findOne({
        loginID: req.body.loginID,
        role,
      });

      if (existingUser)
        return res
          .status(400)
          .json(`This User ${existingUser.loginID} already exists`);

      const classId =
        req.user.role === Role.SUPERUSER ? req.body.class : req.user.class;

      const loginID =
        role === Role.STUDENT ? await genRegNo(classId) : req.body.loginID;
        // console.log({classFromBody: req.body, classFromAuth: req.user}, ' From the userCtrl')

      const user = await new User({
        role,
        middleName,
        firstName,
        lastName,
        loginID,
        class: classId && classId,
        phoneNumber: req.body?.phoneNumber,
        DOB: req.body?.DOB,
      });

      if(classId){
        user.class = classId
      }

      if (role === Role.TEACHER) {
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password, salt);
        user.password = hashPass;
      }

      await user.save();
      return res.json(user);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
  updateUser: async (req, res) => {
    try {
      const {
        loginID,
        classId,
        password,
        phoneNumber,
        middleName,
        firstName,
        lastName,
      } = req.body;

      const user = await User.findById(req.params.userId);
      if (!user) return res.status(400).json("User does not exists");
      if (user.role === Role.TEACHER) {
        const existLoginId = await User.findOne({ loginID });
        if (existLoginId && !user._id.equals(existLoginId._id))
          return res.status(400).json("This Login ID already exists.");
      }
      const canUpdate =
        req.user.role === Role.SUPERUSER ||
        req.user.id === user.id ||
        (req.user.role === Role.TEACHER && req.user.class === user.class);
      if (canUpdate) {
        let hashPass;
        if (password) {
          const salt = await bcrypt.genSalt(10);
          hashPass = await bcrypt.hash(password, salt);
        }

        // const updateField = {
        //   loginID: loginID || user.loginID,
        //   password: password ? hashPass : user.password,
        //   firstName: firstName || user.firstName,
        //   middleName: middleName || user.middleName,
        //   lastName: lastName || user.lastName,
        //   phoneNumber: phoneNumber || user.phoneNumber,
        //   class: classId || user.class,
        // };
        const updateUser = await User.findOneAndUpdate(
          { _id: req.params.userId },
          {$set: {...req.body, password: req.body.password && hashPass}},
          { new: true }
        );
        return res.status(200).json(updateUser);
      } else {
        return res.status(400).json("Forbidden");
      }
    } catch (error) {
      console.log({ error });
      return res.status(500).json(error);
    }
  },
  updateSelf: async (req, res) => {
    try {
      const { loginID, password } = req.body;
      const userLogin = await User.findOne({ loginID });
      if (!userLogin) return res.status(400).json("User not found");
      let hashPass;
      if (password) {
        const salt = await bcrypt.genSalt(10);
        hashPass = await bcrypt.hash(password, salt);
      }
      const updateField = {
        loginID: loginID || userLogin.loginID,
        password: password ? hashPass : userLogin.password,
      };

      const updateUser = await User.findOneAndUpdate(
        { _id: userLogin._id },
        updateField,
        { new: true }
      );
      return res.status(200).json(`User ${userLogin.loginID} is updated`);
    } catch (error) {
      return res.status(500).json(error);
      console.log(error);
    }
  },
  deleteUser: async (req, res) => {
    const user = await User.findById(req.user.id);
    // await user.populate('classes')
    const otherUser = await User.findById(req.params.userId);
    // await otherUser.populate('classes')

    const canDelete =
      user.role === Role.SUPERUSER ||
      (otherUser.role == Role.STUDENT && user._id.equals(otherUser._id)) ||
      (user.role == Role.TEACHER &&
        otherUser.class.toString() == user.class.toString());
    try {
      if (canDelete) {
        await User.findOneAndDelete({ _id: req.params.userId });
        return res.status(200).json("User deleted.");
      } else {
        res.status(400).json("You are Forbidden");
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  login: async (req, res) => {
    try {
      const { loginID, password } = req.body;
      if (!loginID || !password)
        return res.status(400).json("Fields must not be empty");
      const user = await User.findOne({ loginID });
      if (!user) return res.status(400).json("No user found");

      const isMatch = user.verifyPassword(password);
      if (!isMatch) return res.status(400).json("Password is incorrect");

           req.session.userId = user.id;
           req.session.accessTime = new Date();
           await req.session.save();
           return res.status(200).json({ user: user, msg: "Login successful" });

      // const token = jwt.sign(user._doc, process.env.ACCESS_TOKEN)
      // return res.status(200).json({ user: user, msg: "Login successful", token });

    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
  getUserInfo: async (req, res) => {
    try {
        return res.status(200).json({ user: req.user });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  logout: async (req, res) => {
    try {
      // await req.session.destroy();
      req.user = null
      return res.json({ msg: "Logged out" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getAllStudents: async (req, res) => {
    const total = await User.find({ role: "student" }).countDocuments();
    const page = parseInt(req.query.page || 0);
    let limit = 10;

    try {
      const students = await User.find({
        role: "student",
        ...(req.user.role !== Role.SUPERUSER && { class: req.user.class }),
      })
        .limit(limit)
        .skip(limit * page)
        .populate("class");

      // const everyStudent = await User.find({ role: 'student' })
      res
        .status(200)
        .json({ totalPages: Math.ceil(total / limit), students, total });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAllTeachers: async (req, res) => {
    const total = await User.find({ role: "teacher" }).countDocuments();
    const page = parseInt(req.query.page || 0);
    let limit = 7;

    try {
      const teachers = await User.find({
        role: "teacher",
        ...(req.user.role !== Role.SUPERUSER && { class: req.user.class }),
      })
        .limit(limit)
        .skip(limit * page)
        .populate("class");

      // const everyStudent = await User.find({ role: 'student' })
      res
        .status(200)
        .json({ totalPages: Math.ceil(total / limit), teachers, total });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  forgotpassword: async (req, res) => {
    try {
      const { email } = req.body
      if(!email) return res.status(401).json('Please Provide email')
      const user = await User.findOne({ loginID: email })
      if (!user) return res.status(400).json({ msg: 'This email does not exist' })
      const accessToken = jwt.sign({id: user._id}, process.env.ACCESS_TOKEN, {expiresIn: '7m'})
      const url = `${process.env.CLIENT_URL}/user/reset/${accessToken}`
      //  console.log(user._id, url)

      const message = `
     <div style="height: 400px; width: 800px; box-shadow: 4px 2px 12px 4px gray; border: 1px solid gray;">
     <h2 style="text-align: center; font-size: 30px;">PASSWORD RESET</h2>
     <p style="text-align: center; font-size: 24px;">.Please click on the link to reset your password</p><br />
     <a href=${url} style="color: white; margin: 2rem; text-decoration: none; background-color: red; padding: 0.5rem 1rem; borderRadius: 7px; outline: none;">Reset your password</a> <span style="font-size: 20px">or copy this link below</span> <br />
     <div style="margin: 3rem;">${url}</div>
     </div>
  `
      const options = {
        to: email,
        subject: 'You requested for a password Reset',
        message,
        from: 'solution@gmail.com'
      }

      sendMail(options)
      res.json(`Message sent to ${email}`)
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  },
  resetpassword: async (req, res) => {
    try {
      const { password, token } = req.body

      const jwtUser = jwt.verify(token, process.env.ACCESS_TOKEN)
      console.log(jwtUser)
      const hashPass = await bcrypt.hash(password, 10)
      await User.findOneAndUpdate({ _id: jwtUser.id },{
          password: hashPass
      })
      res.json('Password Successfully changed')
    } catch (error) {
      return res.status(500).json(error.message)
    }
  },
  sendMailTo: async (req, res) => {
    try {
      const { senderEmail, content } = req.body
      const checkEmail = (e) => {
        return String(e).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
      }
      if (!checkEmail(senderEmail)) return res.status(400).json('Invalid Email')
      if (!content) return res.status(400).json('Message content empty')

      const msg = `
        <h1>Message from ${senderEmail}</h1>
        <p> ${content} </p>
      `
      const options = {
        from: senderEmail,
        message: msg,
        to: 'chiemelapromise30@gmail.com',
        subject: "From Solution's website to the proprietress",
      }
      await sendMail(options)
      res.status(200).json('Email sent successfully')
    } catch (error) {
      console.log(error)
      return res.status(500).json(error)
    }
  }
};

async function genRegNo(classId) {
  const resData = await Session.find().sort({ year: -1 }).limit(1);
  const {year: sessionYear} = resData[0]

  const { code } = await Class.findById(classId);

  const studentCount = await User.find({
    role: Role.STUDENT,
  }).countDocuments();
  /**
   * sessionYear code studentCount to 3 significant figures
   * 2020 101 001
   */
  return `${sessionYear}${code}${`${1000 + studentCount}`.substring(1)}`;
}

module.exports = userCtrl;
