const express = require("express");
const { userAuth } = require("../middlewares/auth");
const User = require("../models/users");
const { connectionRequestModel } = require("../models/connectionRequest");

const userRouter = express.Router();

//Fetch API calls for pending connection req for loggedIn user
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const user = await connectionRequestModel
      .find({
        toUserId: loggedInUser._id,
        status: "interested",
      })
      .populate("fromUserId", ["firstName", "lastName"]);
    if (user.length === 0) {
      res.status(400).send("No connections found.");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("ERR:", err);
  }
});

//Fetch API calls for connection req for user
userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const user = await connectionRequestModel
      .find({
        $or: [
          { toUserId: loggedInUser._id, status: "accepted" },
          { fromUserId: loggedInUser._id, status: "accepted" },
        ],
      })
      .populate("fromUserId", ["firstName", "lastName"])
      .populate("toUserId", ["firstNme", "lastName"]);
    const data = user.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });
    if (user.length === 0) {
      res.status(400).send("No connections found.");
    } else {
      res.send(data);
    }
  } catch (err) {
    res.status(400).send("ERR:", err);
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
