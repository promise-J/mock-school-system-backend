const mongoose = require("../services/mongoose");
const ClassSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    code: {
      type: Number,
      required: true,
      unique: true,
    },
    // formTeacher: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'User'
    // },
    subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }],
  },
  { timestamps: true }
);

const Class = mongoose.model("Class", ClassSchema);

ClassSchema.pre("deleteOne", function (next) {
  const deleteId = this.getQuery()["_id"];
  mongoose.model("User").deleteOne({ formTeacher: deleteId });
  next();
});

ClassSchema.pre("deleteOne", function (next) {
  const subId = this.getQuery()["_id"];
  mongoose
    .model("Subject")
    .deleteMany({ subjects: subId }, function (err, result) {
      if (err) {
        console.log(`[error] ${err}`);
        next(err);
      } else {
        console.log("success");
        next();
      }
    });
});

ClassSchema.set("toJSON", {
  virtuals: true,
});

// ClassSchema.plugin(require('mongoose-autopopulate'))

// ClassSchema.pre('deleteMany', function(next) {
//   var classModel = this;
//   classModel.model('User').deleteOne({ class: classModel._id }, next);
// });

module.exports = { Class };
