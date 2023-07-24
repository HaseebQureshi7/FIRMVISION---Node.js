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
  messageType: {
    type: String,
    default: "message",
  },
  status: {
    type: String,
    default: "unread",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Message", MessageModel);
