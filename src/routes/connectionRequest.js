const express = require("express")
const { userAuth } = require("../middlewares/auth");

const connectionRequstRouter = express.Router()



connectionRequstRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
    try {
      const user = req.user;
      console.log(user.firstName + "send connection request");
      res.send(user.firstName + " " + "send connection request");
    } catch (err) {
      res.status(400).send("ERROR in connection request", err);
    }
  });



  module.exports = {connectionRequstRouter}



