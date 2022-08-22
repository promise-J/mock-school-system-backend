const {Class} = require('../models/Class.model')

const classCtrl = {
  getClass: async(req, res)=>{
    try {
      const {classId: _id} = req.params
      const existClass = await Class.findById(_id)
      if(!existClass) return res.status(400).json('This Class does not exist')
      await existClass.populate('subjects')
      return res.status(200).json(existClass)
    } catch (error) {
      return res.status(500).json(error)
    }
  },
  createClass: async(req, res)=>{
    try {
      const {name, subjects, code} = req.body
      if(!name || !subjects || !code) return res.status(400).json('Fields must be filled')
      const existClass = await Class.findOne({name})
      if(existClass) return res.status(400).json('Class already exists')
      const newClass = new Class({name, subjects, code})
      newClass.save()
      return res.status(200).json(`${newClass.name} Created!`)
    } catch (error) {
      return res.status(500).json(error)
    }
  },
  updateClass: async(req, res)=>{
    try {
      const {classId: _id} = req.params
      const Dclass = await Class.findById(_id)

      const Uclass = await Class.findOneAndUpdate({_id}, {
        subjects: req.body.subjects || Dclass.subjects,
        name: req.body.name || Dclass.name
      },{new: true} )
      return res.status(200).json(Uclass)
    } catch (error) {
      res.status(500).json(error)
    }
  },
  deleteClass: async(req, res)=>{
     try {
      const {classId: _id} = req.params
      const dClass = await Class.findOneAndDelete({_id})
      return res.status(200).json(`${dClass.name} Deleted.`)
     } catch (error) {
       
     }
  },
  getAllClasses: async(req, res)=>{
    const limit = 10
    const total = await Class.find({}).countDocuments()
    const page = parseInt(req.query.page || 0)
    try {
      const classes = await Class.find({}).limit(limit).skip(limit * page)
      res.status(200).json({totalPages: Math.ceil(total/limit),classes, total})
    } catch (error) {
      return res.status(500).json(error)
    }
  }
}

module.exports = classCtrl
