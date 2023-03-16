const mongoose = require("mongoose");

const ReminderModel = mongoose.Schema({
  setBy: {
    type: String,
    required: true,
  },
  setDate: {
    type: Date,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  setAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Reminder", ReminderModel);
