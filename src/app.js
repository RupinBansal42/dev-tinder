const express = require("express");
const { connectDB } = require("./config/database");

const User = require("./models/users");

const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
  console.log("signup", req.body);
  // const {firstName, lastName,age, gender, emailID, password} = req.body
  const user = new User(req.body);
  await user.save();
  res.send("Data Saved Successfully");
});

//Fetch API calls for user
app.get("/user", async (req, res) => {
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
app.get("/feed", async (req, res) => {
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

connectDB()
  .then(() => {
    console.log("DB connected successfully");
    app.listen(3000, () => {
      console.log("Server is listening on port 3000");
    });
  })
  .catch((err) => {
    console.log("Not connected successfully");
  });
