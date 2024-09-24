const express = require("express");
const { Connection } = require("mongoose");
const { userAuth } = require("../middlewares/auth");
const User = require("../models/users");
const { connectionRequestModel } = require("../models/connectionRequest");

const connectionRequestRouter = express.Router();

connectionRequestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;
      const allowedStatus = ["ignored", "interested"];

      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ message: "Bad Request" });
      }

      // const toUser = await User.findById(toUserId);
      // if (!toUser) {
      //   return res.status(404).json({ message: "User not avialable in App" });
      // }
      //Check if connection exists
      const existingConnectionrequest = await connectionRequestModel.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      console.log("existingConnectionrequest", existingConnectionrequest);
      if (existingConnectionrequest) {
        return res
          .status(400)
          .json({ message: "Connection Request already available" });
      }
      const connectionRequest = new connectionRequestModel({
        fromUserId,
        toUserId,
        status,
      });

      const connectionRequestData = await connectionRequest.save();
      res.json({
        message: `send connection request....`,
        data: connectionRequestData,
      });
    } catch (err) {
      res.status(400).send("ERROR in connection request" + err);
    }
  }
);

module.exports = { connectionRequestRouter };
