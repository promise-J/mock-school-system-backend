const router = require("express").Router();
const {
  getUser,
  createUser,
  deleteUser,
  updateUser,
  getAllUsers,
  updateSelf,
  getAllTeachers,
  login,
  getAllStudents,
  getUserInfo,
  logout,
  sendMailTo,
  forgotpassword,
  resetpassword
} = require("../controllers/UserCtrl");
const { adminOnly, superUser } = require("../utils/adminAuth");
const auth = require("../utils/auth");

router.route("/").post(auth, adminOnly, createUser);
router.route("/all").get(auth, adminOnly, getAllUsers);
router.route("/updateSelf").put(auth, updateSelf);

router.get("/info", auth, getUserInfo);
router.get("/logout", logout);
router
  .route("/:userId")
  .put(auth, adminOnly, updateUser)
  .delete(auth, superUser, deleteUser)
  .get(auth, getUser);
router.route("/login").post(login);
router.route("/all/students").get(auth, adminOnly, getAllStudents);
router.route("/all/teachers").get(auth, superUser, getAllTeachers);
router.route('/emailing').post(sendMailTo);
router.route('/forgotEmail').post(forgotpassword)
router.route('/resetEmail').post(resetpassword)

module.exports = router;
