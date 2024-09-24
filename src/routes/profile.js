const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { validateEditProfile } = require("../utils/validateEditProfile");
const User = require("../models/users");

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (err) {
    res.status(400).send("ERROR", err.message);
  }
});

profileRouter.patch("/profile/edit/", userAuth, async (req, res, next) => {
  try {
    if (!validateEditProfile(req.body)) {
      throw new Error("Edit not allowed for specific fields");
    }
    const loggedInUser = req.user;
    console.log("Logged", loggedInUser)

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    console.log("Logged", loggedInUser)
    await loggedInUser.save();
    res.json({ message : `${loggedInUser.firstName} Profile Updated Successfully`, data : loggedInUser})

  } catch (err) {
    res.status(400).send("ERROR:" + err);
  }
});

module.exports = { profileRouter };
