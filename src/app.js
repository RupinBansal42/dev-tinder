const express = require("express");
const { connectDB } = require("./config/database");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors")
const app = express();
app.use(cors( {
  origin : "http://localhost:5173",
  credentials : true
}))

app.use(express.json());
app.use(cookieParser());

const { authRouter } = require("./routes/auth");
const { profileRouter } = require("./routes/profile");
const { userRouter } = require("./routes/user");
const { connectionRequestRouter } = require("./routes/connectionRequest");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", userRouter);
app.use("/", connectionRequestRouter);

connectDB()
  .then(() => {
    console.log("DB connected successfully");
    app.listen(7777, () => {
      console.log("Server is listening on port 7777");
    });
  })
  .catch((err) => {
    console.log("Not connected successfully");
  });
