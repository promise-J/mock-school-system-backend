const router = require('express').Router()
const {getSubject, updateSubject, createSubject, deleteSubject, getAllSubjects} = require('../controllers/SubjectCtrl')
const { adminOnly, superUser } = require('../utils/adminAuth')
const auth = require('../utils/auth')


router.route('/')
  .get(auth, adminOnly, getAllSubjects)
  .post(auth, superUser, createSubject)
router.route('/:subjectId')
  .put(auth, superUser, updateSubject)
  .delete(auth, superUser, deleteSubject)
  .get(auth, superUser, getSubject)

module.exports = router