const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://shivamsk2315:test1@cluster0.ysbjcfj.mongodb.net/",
      {}
    );
    console.log(`MongoDB connected: ${conn.connection.host}`.blue.bold);
  } catch (err) {
    console.log(`Error: ${err.message}`.red.bold);
    process.exit();
  }
};
module.exports = connectDB;
