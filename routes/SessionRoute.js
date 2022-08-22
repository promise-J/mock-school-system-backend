const router = require('express').Router()
const {getSession, updateSession, deleteSession, createSession, allSession} = require('../controllers/SessionCtrl')
const { superUser, adminOnly } = require('../utils/adminAuth')
const auth = require('../utils/auth')

// router.use(auth, superUser)

router.route('/')
.post(auth, superUser,createSession)
router.route('/:sessionId')
.put(auth, superUser, updateSession)
.delete(auth, superUser, deleteSession)
.get(auth, adminOnly, getSession)
router.route('/all/session')
.get(allSession)

module.exports = router