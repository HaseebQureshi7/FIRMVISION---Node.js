const jwt = require("jsonwebtoken");
const MessageModel = require("../models/MessageModel");

const SendMessage = async (req, res) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  const decoded = jwt.verify(token, process.env.JWT_SK);
  const sentBy = decoded.user._id;

  const { sentTo, text } = req.body;
  if ((sentTo, text)) {
    const message = await MessageModel.create({ sentTo, sentBy, text });
    res.status(201).send(message);
  } else {
    res.status(400).send("Missing fields in the form!");
  }
};

// VIEW ALL RECEIVED MESSAGES
const ViewReceivedMessages = async (req, res) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  const decoded = jwt.verify(token, process.env.JWT_SK);
  const sentTo = decoded.user._id;

  const tasks = await MessageModel.find({ sentTo });
  res.status(200).json(tasks);
};

// VIEW ALL SENT MESSAGES
const ViewSentMessages = async (req, res) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  const decoded = jwt.verify(token, process.env.JWT_SK);
  const sentBy = decoded.user._id;

  const tasks = await MessageModel.find({ sentBy });
  res.status(200).json(tasks);
};

module.exports = {
  SendMessage,
  ViewReceivedMessages,
  ViewSentMessages,
};
