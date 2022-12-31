const bcrypt = require("bcryptjs");
const { Schema, model } = require("mongoose");
const joi = require("joi");
const { func } = require("joi");

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: String,
  },
  { versionKey: false, timestamps: true }
);

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};
const User = model("user", userSchema);

const joiUserSchema = joi.object({
  password: joi.string().required(),
  email: joi.string().required(),
  subscription: joi.string(),
});

module.exports = {
  User,
  joiUserSchema,
};
