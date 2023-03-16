const mongoose = require("mongoose");

const MessageModel = mongoose.Schema({
  sentTo: {
    type: String,
    required: true,
  },
  sentBy: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Message", MessageModel);
