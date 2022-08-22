const {ResultItem} = require('../models/ResultItem.model')

const resultCtrl = {
  updateResultItem: async(req, res)=>{
    try {
      const {firstTest, secondTest, grade, exam} = req.body
      if(firstTest > 20 || secondTest > 20) return res.status(400).json('Score can not be above 20')
      if(exam > 60) return res.status(400).json('Score can not be above 20')
      
      const rawTotal = Number(firstTest) + Number(secondTest) + Number(exam)
      const rawGrade = rawTotal >= 70 ? 'A' : (rawTotal >= 60 && rawTotal <=69) ? 'B' : (rawTotal >= 50 && rawTotal <=59) ? 'C' : (rawTotal >= 39 && rawTotal <=49) ? 'D' : 'F'


      const {resultItemId: _id} = req.params
      const existingResult = await ResultItem.findById(_id)



      const result = await ResultItem.findOneAndUpdate({_id}, {
        firstTest: firstTest || existingResult.firstTest,
        secondTest: secondTest || existingResult.secondTest,
        exam: exam || existingResult.exam,
        grade: rawGrade || existingResult.grade,
      },{new: true} )
      return res.status(200).json(result)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  },
  deleteResultItem: async(req, res)=>{
    try {
      const {resultItemId: _id} = req.params
      await ResultItem.findOneAndDelete({_id})
      return res.status(200).json('This result record has been deleted.')
      
    } catch (error) {
      return res.status(500).json(error)
    }
  },
}

module.exports = resultCtrl