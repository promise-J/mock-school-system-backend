const { Role } = require("../constants/constansts");
const { Class } = require("../models/Class.model");
const { Subject } = require("../models/Subject.model");
const { User } = require("../models/User.model");

const statsCtrl = {
  getStats: async (req, res) => {
    const user = req.user;

    const [studentCount, classesCount, teachesCount, subjectCount] =
      await Promise.all([
        User.find({
          role: Role.STUDENT,
        }).countDocuments(),
        Class.find().countDocuments(),
        User.find({ role: Role.TEACHER }).countDocuments(),
        Subject.find().countDocuments(),
      ]);

    return res.status(200).json({
      stats: {
        studentCount,
        classesCount,
        teachesCount,
        subjectCount,
      },
    });
  },
};

module.exports = statsCtrl;
