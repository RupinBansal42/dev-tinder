const express = require("express");
const { userAuth, adminAuth } = require("../middlewares/auth");
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
      res.json({ message: "No connections found." });
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
      .populate("toUserId", ["firstName", "lastName"]);
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
userRouter.get("/user/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    console.log("sjfdfds", skip, limit, page);
    // find all connection [sent + recieved]
    const connectionRequest = await connectionRequestModel
      .find({
        $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
      })
      .select("fromUserId toUserId");

    //For unique elements,
    const hideUsersFromFeed = new Set();
    connectionRequest.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId.toString());
      hideUsersFromFeed.add(req.toUserId.toString());
    });

    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select("firstName lastName _id photoURL skills about ")
      .skip(skip)
      .limit(limit);
    res.send(users);
  } catch (err) {
    res.status(400).send("Data not found");
  }
});

module.exports = { userRouter };
