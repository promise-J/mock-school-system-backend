const mongoose = require("../services/mongoose");

const MessageSchema = mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
    // autopopulate: true
  },
  message: {
    type: String,
    required: true
  }
}, {timestamps: true});

// MessageSchema.plugin(require('mongoose-autopopulate'))


const Message = mongoose.model("Message", MessageSchema);

module.exports = { Message };