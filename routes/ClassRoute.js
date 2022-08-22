const router = require('express').Router()
const {getClass, createClass, deleteClass, updateClass, getAllClasses} = require('../controllers/ClassCtrl')
const { superUser, adminOnly } = require('../utils/adminAuth')
const auth = require('../utils/auth')


router.route('/')
  .get(auth, adminOnly, getAllClasses)
  .post(auth, adminOnly, createClass)
router.route('/:classId')
  .put(auth, adminOnly, updateClass)
  .delete(auth, adminOnly, deleteClass)
  .get(auth, adminOnly, getClass)

module.exports = router