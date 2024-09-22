const express = require("express");
const { connectDB } = require("./config/database");

const User = require("./models/users");

const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
  console.log("signup", req.body);
  // const {firstName, lastName,age, gender, emailID, password} = req.body
  try {
    const user = new User(req.body);
    await user.save();
    res.send("Data Saved Successfully");
  } catch (err) {
    res.status(400).send(err);
  }
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

app.delete("/user/", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.deleteOne({ _id: userId });
    res.send("Delete user Successfully");
  } catch (err) {
    res.status(400).send("Data not found");
  }
});

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    // const ALLOWED_UPDATES = [
    //   "userId",
    //   "photoURL",
    //   "gender",
    //   "about",
    //   "age",
    //   "skills",
    // ];

    // const isUpdatedAllowed = Object.keys(data).every((key) =>
    //   ALLOWED_UPDATES.includes(key)
    // );
    // console.log("isUpdatedAllowed",isUpdatedAllowed)
    // if (!isUpdatedAllowed) {
    //   throw new Error("Update Not Allowed");
    // }
    if (data.skills.length > 5) {
      throw new Error ("Skills Length cannot be more than 5")
    }
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "before",
    });
    res.send("Updated user Successfully");
  } catch (err) {
    res.status(400).send(err.message);
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
