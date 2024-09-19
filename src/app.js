const express = require("express");

const app = express();
const { adminAuth, userAuth } = require("./middlewares/auth");

app.use("/admin", adminAuth);
app.use("/user", userAuth);

app.get("/user/login", (req, res) => {
  res.send("Login Successfully");
});
app.get("/user", userAuth, (req, res) => {
  res.send("All Data recieved");
});

app.use("/admin/getAllData", (req, res) => {
  res.send("All Data records");
});
app.get("/user/:userID/:name", (req, res) => {
  console.log("Params", req.params);
  res.send("User Details Recieved");
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
