const jwt = require("jsonwebtoken");
const User = require("../models/users");

const adminAuth = (req, res, next) => {};

const userAuth = async (req, res, next) => {
  // Read token from request
  // validate token
  //Find user
  try {
    const { token } = req.cookies;
    console.log("token", token)
    if (!token) {
      throw new Error("Token not found");
    }
    const decodedObj = await jwt.verify(token, "DEV@tinder$123");
    const { _id } = decodedObj;
    const user = await User.findOne({_id});
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = { adminAuth, userAuth };