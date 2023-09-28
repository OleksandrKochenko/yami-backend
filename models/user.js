const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../middlewares/");
const {
  userEmailRegExp,
  userEmailMessage,
  userPasswordMessage,
  userNameMessage,
} = require("../constants/userConstants");

const userSchema = new Schema(
  {
    name: { type: String, required: [true, userNameMessage] },
    email: {
      type: String,
      match: userEmailRegExp,
      unique: true,
      required: [true, userEmailMessage],
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, userPasswordMessage],
    },
    avatarURL: {
      type: String,
    },
    token: { type: String },
    verify: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

module.exports = User;
