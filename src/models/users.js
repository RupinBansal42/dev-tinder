const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  emailID: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    minLength: 4,
  },
  password: { type: String, required: true },
  age: { type: Number, min: 18 },
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
  },
  about: { type: String, default: "This is a default about of user" },
  skills: { type: [String] },
}, {timestamps : true});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
