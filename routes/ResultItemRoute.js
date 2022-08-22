const router = require('express').Router()
const {updateResultItem, deleteResultItem} = require('../controllers/ResultItemCtrl')
const { adminOnly } = require('../utils/adminAuth')
const auth = require('../utils/auth')

router.route('/:resultItemId')
  .put(auth, adminOnly, updateResultItem)
  .delete(auth, adminOnly, deleteResultItem)

module.exports = router