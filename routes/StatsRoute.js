const router = require("express").Router();
const { getStats } = require("../controllers/StatsCtrl");
const { adminOnly } = require("../utils/adminAuth");
const auth = require("../utils/auth");

router.route("/").get(auth, adminOnly, getStats);

module.exports = router;
