const mongoose = require("mongoose");

const connectToMongoose = () => {
  try {
    mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to Mongo Servers!");
  } catch {
    console.log("Connection to Database failed!");
  }
};

module.exports = connectToMongoose;
