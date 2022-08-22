const mongoose = require("../services/mongoose");
const ResultSchema = mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      // autopopulate: true
    },
    term: {
      type: String,
      enum: ["first", "second", "third"],
    },
    session: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Session",
      required: true,
      //  autopopulate: true
    },
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ResultItem",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

// ResultSchema.plugin(require('mongoose-autopopulate'))

ResultSchema.set("toJSON", {
  virtuals: true,
});

const Result = mongoose.model("Result", ResultSchema);

module.exports = { Result };
