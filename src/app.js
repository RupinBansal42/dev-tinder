const express = require("express");

const app = express();

app.get("/user/:userID/:name", (req, res) => {
  console.log("Params", req.params);
  res.send("User Details Recieved");
});

app.post("/user", [
  (req, res, next) => {
    // res.send("Saved User Details successfully");
    next();
  },
  (req, res) => {
    res.send("New Data saved successfully");
  },
]);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
