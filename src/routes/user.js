const express = require("express");
const User = require("../models/users");

const userRouter = express.Router();

//Fetch API calls for user
userRouter.get("/user", async (req, res) => {
  const lastName = req.body.lastName;
  try {
    const user = await User.findOne({ lastName: lastName });
    if (user.length === 0) {
      res.status(400).send("User not Found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Data not found");
  }
});

// Fetch all users details
userRouter.get("/feed", async (req, res) => {
  try {
    const user = await User.find({});
    if (user.length === 0) {
      res.status(400).send("User not Found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Data not found");
  }
});

userRouter.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    if (data.skills.length > 5) {
      throw new Error("Skills Length cannot be more than 5");
    }
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "before",
    });
    res.send("Updated user Successfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = { userRouter };
