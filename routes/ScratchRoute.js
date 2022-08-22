const router = require('express').Router()
const {getScratch, deleteCard, getCardInfo} = require('../controllers/ScratchCtrl')
const { superUser } = require('../utils/adminAuth')
const auth = require('../utils/auth')

router.route('/').get(getScratch)
router.route('/info').get(getCardInfo)
router.route('/:id').delete(deleteCard)
// router.route('/').put(updateScratch)

module.exports = router