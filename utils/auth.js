const jwt = require("jsonwebtoken");
const { User } = require("../models/User.model");

// const auth = async (req, res, next) => {
//   const token = req.header("Authorization");
//   if (!token){
//     console.log('no token is here')
//     return res.status(400).json("Authorization Failed");
//   }
//   try {
//     console.log(token, 'the token')
//     const user = jwt.verify(token, process.env.ACCESS_TOKEN);
//     req.user = user
//     next();
//   } catch (error) {
//     console.log('not authorized')
//     res.status(500).json(error);
//   }
// };

const auth = async (req, res, next) => {
  try {
    const isUserId = req.headers['userid']
    if (!isUserId) {
      return res.status(400).json({ msg: "Invalid Authorization here oooh" });
    }
    req.user = await User.findById(isUserId);
    next();
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};

module.exports = auth;


