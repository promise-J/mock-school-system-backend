const mongoose = require("../services/mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const constants = require("../constants/constansts");
const opts = {
  toJSON: {
    virtuals: true,
  },
};

const UserSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
    },
    password: {
      type: String,
      // required: true,
    },
    loginID: {
      type: String,
      required: true,
      unique: true,
    },
    DOB: {
      type: String,
    },
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
    },
    role: {
      type: String,
      required: true,
      enum: constants.ROLES,
    },
  },
  { timestamps: true },
  opts
);

// UserSchema.plugin(require('mongoose-autopopulate'))

UserSchema.virtual("fullName")
  .get(function () {
    return `${this.firstName} ${this.lastName}`;
  })
  .set(function (v) {
    // `v` is the value being set, so use the value to set
    // `firstName` and `lastName`.
    const firstName = v.substring(0, v.indexOf(" "));
    const lastName = v.substring(v.indexOf(" ") + 1);
    this.set({ firstName, lastName });
  });

UserSchema.methods.genToken = function () {
  const token = jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN, {
    expiresIn: "3d",
  });
  return token;
};

UserSchema.methods.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.set("toJSON", {
  virtuals: true,
});

UserSchema.options.toJSON.transform = function (doc, ret, options) {
  // remove the password of every document before returning the result
  delete ret.password;
  return ret;
};

const User = mongoose.model("User", UserSchema);

module.exports = { User };
