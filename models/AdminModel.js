const mongoose = require("mongoose");

const AdminModel = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    default: "default",
  },
  picture: {
    type: String,
    default: "default",
  },
  companyName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  directMessage: {
    type: Boolean,
    default: true,
  },
  emailOnMessage: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Admin", AdminModel);
