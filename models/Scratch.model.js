const config = require("../config");
const mongoose = require("../services/mongoose");
const ScratchSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    result: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Result",
      default: null,
    },
    usageCount: {
      type: Number,
      default: 0,
    },
    card: {
      type: String,
    },
    date: { type: String },
  },
  { timestamps: true }
);

ScratchSchema.set("toJSON", {
  virtuals: true,
});

ScratchSchema.options.toJSON.transform = function (doc, ret, options) {
  // remove the password of every document before returning the result
  delete ret.password;
  return { ...ret, maxUseCount: config.app.maxCardUsageCount };
};

const Scratch = mongoose.model("Scratch", ScratchSchema);

module.exports = { Scratch };
