const mongoose = require("../services/mongoose");
const SubjectSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

SubjectSchema.set("toJSON", {
  virtuals: true,
});
const Subject = mongoose.model("Subject", SubjectSchema);

module.exports = { Subject };
