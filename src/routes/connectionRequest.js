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

connectionRequestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const { status, requestId } = req.params;
      const loggedInUser = req.user;
      const allowedStatus = ["accepted", "rejected"];
      console.log("loggedInUser",loggedInUser)
      if (!allowedStatus.includes(status)) {
        return res.status(400).send({ message: "Status not allowed" });
      }
      console.log(requestId, loggedInUser._id, status)
      const connectionRequest = await connectionRequestModel.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });
      if (!connectionRequest) {
        return res
          .status(404)
          .json({ message: "Connection Request not found" });
      }
      connectionRequest.status = status;
      const data = await connectionRequest.save();
      res.json({ message: "Connection Request" + status, data });
    } catch (err) {
      res.status(400).send("ERROR in connection request" + err);
    }
  }
);

module.exports = { connectionRequestRouter };
