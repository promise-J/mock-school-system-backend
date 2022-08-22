const router = require("express").Router();
const {
  getResult,
  createResult,
  deleteResult,
  downloadPdf,
  // updateResult,
  authenticate,
  allResult,
} = require("../controllers/ResultCtrl");
const { adminOnly } = require("../utils/adminAuth");

const auth = require("../utils/auth");

router
  .route("/")
  .post(auth, adminOnly, createResult)
  .get(auth, adminOnly, allResult);

router.route("/authenticate").post(authenticate);

router.get("/:resultId/download", auth, downloadPdf);
router
  .route("/:resultId")
  // .put(auth, adminOnly, updateResult)
  .delete(auth, adminOnly, deleteResult)
  .get(auth, getResult);

module.exports = router;

// student - 615848be69b7f34886800ec1
// term - first
// session - 6158448c49a9f185170710db
