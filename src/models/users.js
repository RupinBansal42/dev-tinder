const mongoose = require("mongoose");
var validator = require("validator");
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    emailID: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      minLength: 4,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email ID format");
        }
      },
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    age: {
      type: Number,
      min: 18,
      required: true,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender Data is not valid");
        }
      },
    },
    photoURL: {
      type: String,
      default:
        "https://www.ihna.edu.au/blog/wp-content/uploads/2022/10/user-dummy.png",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid PHOTO URL format");
        }
      },
    },
    about: { type: String, default: "This is a default about of user" },
    skills: { type: [String], maxLength: 5 },
  },
  { timestamps: true }
);

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "DEV@tinder$123", {
    expiresIn: "7d",
  });
  return token;
};
const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
