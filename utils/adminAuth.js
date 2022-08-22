const { User } = require("../models/User.model");

const superList = ["superuser"];
const adminList = ["superuser", "teacher"];

const superUser = async (req, res, next) => {
  try {
    if (!superList.includes(req.user.role))
      return res.status(400).json("Forbidden Request");
    // if(user.role === 'superuser') return res.status(400).json({msg: "Available to only Super users"})
    next();
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const adminOnly = async (req, res, next) => {
  try {
    if (!adminList.includes(req.user.role))
      return res.status(400).json("Forbidden Request");
    // if(user.role === 'teacher') return res.status(400).json({msg: "Available to only teachers"})
    next();
  } catch (error) {
    console.log({ error });
    return res.status(500).json(error.message);
  }
};

module.exports = { superUser, adminOnly };
