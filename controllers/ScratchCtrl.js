const {Scratch} = require('../models/Scratch.model')
const cronJob = require('node-cron')
const config = require("../config");


const scratchCtrl = {
  getScratch: async(req, res)=>{
    const total = await Scratch.find({}).countDocuments()
    const page = parseInt(req.query.page || 0)
    // const total = await Subject.find({}).countDocuments()
    const limit = 10
    let cards
    if(req.query.page){
      cards = await Scratch.find().limit(limit).skip(page * limit).populate({
        path: 'result',
        populate: {path: 'student'}
      })
    }else{
      cards = await Scratch.find().populate('result')
    }
    // const cards = await Scratch.find({})
    const invalidCards = await Scratch.find({usageCount: {
      $gte: config.app.maxCardUsageCount
    }}).countDocuments()
    // return res.json({total: cards.length, cards, invalidCards})
    return res.status(200).json({cards, invalidCards,totalPages: Math.ceil(total / limit), total})

  },
  getCardInfo: async(req, res)=>{
    try {
      const {card} = req.query
      const cardInfo = await Scratch.findOne({card})
      return res.status(200).json(cardInfo)
    } catch (error) {
      return res.status(500).json(error)
    }
  },
  deleteCard: async(req, res)=>{
    try {
      await Scratch.findByIdAndDelete(req.params.id)
      return res.status(200).json('Card Deleted')
    } catch (error) {
      return res.status(500).json(error)
    }
  }
}


module.exports = scratchCtrl

   