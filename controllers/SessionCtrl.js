const {Session} = require('../models/Session.model')

const sessionCtrl = {
  getSession: async(req, res)=>{
    try {
      const {sessionId: _id} = req.params
      const session = await Session.findById(_id)
      return res.status(200).json(session)
    } catch (error) {
      return res.status(500).json(error)
    }
  },
  createSession: async(req, res)=>{
    try {
      const {year, currentTerm} = req.body
      const existingYear = await Session.findOne({year})
      if(existingYear) return res.status(400).json(`Year ${year} already exists`)
      if(!year) return res.status(400).json('year must not be empty')
      if(!currentTerm) return res.status(400).json('Current term must not be empty')
      const newSession = await new Session({year, currentTerm}).save()

      return res.status(200).json('Session created!')
    } catch (error) {
        return res.status(500).json(error)
    }
  },
  updateSession: async(req, res)=>{
    try {
      const {sessionId: _id} = req.params
      const {year, currentTerm} = req.body
      const current = await Session.findById(_id)
      const session = await Session.findOneAndUpdate({_id}, {
        // year: req.body.year || current.year,
        currentTerm: req.body.currentTerm || current.currentTerm
      }, {new: true})
      return res.status(200).json(`Session ${current.year} Updated`)
    } catch (error) {
      return res.status(500).json(error)
    }
  },
  deleteSession: async(req, res)=>{
    try {
      const {sessionId: _id} = req.params
      const session = await Session.findOneAndDelete({_id})
      res.status(200).json(`${session.year} has been deleted`)
    } catch (error) {
      return res.status(500).json(error)
    }
  },
  allSession: async(req, res)=>{
    // try {
    //   const all = await Session.find()
    //   res.status(200).json(all)
    // } catch (error) {
    //   res.status(500).json(error)
    // }
    const page = parseInt(req.query.page || 0)
    const total = await Session.find({}).countDocuments()
    const limit = 10
    let sessions
    if(req.query.page){
      sessions = await Session.find().limit(limit).skip(page * limit)
    }else{
      sessions = await Session.find()
    }

    // const cards = await Session.find({})
    // return res.json({total: cards.length, cards, invalidCards})
    return res.status(200).json({sessions, totalPages: Math.ceil(total / limit), total})
  }
}

module.exports = sessionCtrl