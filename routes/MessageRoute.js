const router = require('express').Router()
const {getScratch, updateScratch, getCardInfo} = require('../controllers/ScratchCtrl')
const { superUser } = require('../utils/adminAuth')
const auth = require('../utils/auth')
const {Message} = require('../models/Message.model')

router.route('/').get(async(req, res)=>{
    try {
        const messages = await Message.find().populate('sender')
        return res.status(200).json(messages)
    } catch (error) {
        return res.status(500).json(error)
    }
})
router.route('/').post(async(req, res)=>{
    try {
        const {sender, message} = req.body
        if(!sender || !message) return res.status(400).json('Fields must not be empty')
        const newMessage = new Message({sender, message})
        await newMessage.save()
        return res.status(200).json(newMessage)
    } catch (error) {
        return res.status(500).json(error)
    }
})
router.route('/:messageId').delete(async(req, res)=>{
    try {
        const {messageId} = req.params
        await Message.findByIdAndDelete(messageId)
        return res.status(200).json(messageId)
    } catch (error) {
        return res.status(500).json(error)
    }
})
// router.route('/').put(updateScratch)

// 61ae0647a433103c08dcebaf

module.exports = router