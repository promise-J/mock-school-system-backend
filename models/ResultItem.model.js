const mongoose = require("../services/mongoose");
const { Result } = require("./Result.model");

const opts = {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
}

const ResultItemSchema = mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
    // autopopulate: true
  },
  subject: {
     type: mongoose.Schema.Types.ObjectId,
     ref: 'Subject',
     required: true,
     autopopulate: true
  },
  grade: {
      type: String,
      default: 'F',
      enum: ['A', 'B', 'C', 'D', 'E', 'F']
  },
  exam: {
      type: Number,
      default: 0,
      required: true
  },
  firstTest: {
      type: Number,
      default: 0,
      required: true
  },
  secondTest: {
      type: Number,
      default: 0,
      required: true
  },
  // total: {
  //   type: Number,
  //   required: true
  // }
}, {timestamps: true}, opts);


ResultItemSchema.virtual('total').get(function(){
  return this.exam + this.firstTest + this.secondTest
})

// ResultItemSchema.plugin(require('mongoose-autopopulate'))

const ResultItem = mongoose.model("ResultItem", ResultItemSchema);

module.exports = { ResultItem };
