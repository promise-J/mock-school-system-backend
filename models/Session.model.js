const mongoose = require("../services/mongoose");
const SessionSchema = mongoose.Schema(
  {
    year: {
      type: Number,
      required: true,
      unique: true,
      // default: Date.now().getFullYear()
    },
    currentTerm: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

SessionSchema.virtual("trueSession").get(function () {
  return this.year + "/" + this.year + 1;
});

const Session = mongoose.model("Session", SessionSchema);

module.exports = { Session };
