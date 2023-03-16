const mongoose = require("mongoose");

const TaskModel = mongoose.Schema({
  assignedTo: {
    type: String,
    required: true,
  },
  assignedBy: {
    type: String,
    required: true,
  },
  assignedAt: {
    type: Date,
    default: Date.now(),
  },
  name: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "incomplete",
  },
  deadline: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    required: true,
  },
  completionDate: {
    type: String,
    default: "NA",
  },
  submittionReport: {
    type: String,
    default: "NA",
  },
});

module.exports = mongoose.model("Task", TaskModel);
