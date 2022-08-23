const jwt = require("jsonwebtoken");
const { User } = require("../models/User.model");

module.exports.jwtAuth = async(req, res, next)=>{
  const token = req.header('Authorization')
  if(!token) return res.status(400).json('Authorization Failed')
  try {
    const user = jwt.verify(token, process.env.ACCESS_TOKEN)
    console.log(user)
    next()
  } catch (error) {
    res.status(500).json('Not authorized')
  }
}

const auth = async (req, res, next) => {
  try {
    if (!req.session.userId) {
      console.log('not session found')
      return res.status(400).json({ msg: "Invalid Authorization/no session" });
    }
    req.user = await User.findById(req.session.userId);
    next();
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};

module.exports = auth;


