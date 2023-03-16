const mongoose = require("mongoose");

const EmployeeModel = mongoose.Schema({
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
  password: {
    type: String,
    required: true,
  },
  employeeOf: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Employee", EmployeeModel);
