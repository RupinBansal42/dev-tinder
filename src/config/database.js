const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://admin:admin@namastenode.a3liq.mongodb.net/devTinder"
  );
};

module.exports = {connectDB}