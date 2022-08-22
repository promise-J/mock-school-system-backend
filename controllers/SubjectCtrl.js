const {Subject} = require('../models/Subject.model')

const subjectCtrl = {
  getSubject: async(req, res)=>{
    const {subjectId: _id} = req.params
    const subject = await Subject.findById(_id)
    if(!subject) return res.status(400).json('This subject does not exist')
    res.status(200).json(subject)
  },
  createSubject: async(req, res)=>{
    try {
      
      const {name} = req.body
      if(!name) return res.status(400).json('Subject must be filled')
      const existingSubject = await Subject.findOne({name})
      if(existingSubject) return res.status(400).json(`${existingSubject.name} already exists`)
      const newSubject = new Subject({name})
      newSubject.save()
      res.send(`${newSubject.name} Created!`)
    } catch (error) {
      return res.status(500).json(error)
    }
  },
  updateSubject: async(req, res)=>{
    const {subjectId: _id} = req.params,
    {name} = req.body
    const updSubject  = await Subject.findOneAndUpdate({_id}, {
      name
    }, {new: true})
    res.status(200).json(updSubject)
  },
  deleteSubject: async(req, res)=>{
    const {subjectId: _id} = req.params
    const del = await Subject.findOneAndDelete({_id})
    res.status(200).json(`${del.name} was deleted`)
  },
  getAllSubjects: async(req, res)=>{
    const page = parseInt(req.query.page || 0)
    const total = await Subject.find({}).countDocuments()
    const limit = 10
    let all
    if(req.query.page){
      all = await Subject.find().limit(limit).skip(page * limit)
    }else{
      all = await Subject.find()
    }

    res.status(200).json({subjects: all, totalPages: Math.ceil(total / limit), total})
  }
}

module.exports = subjectCtrl