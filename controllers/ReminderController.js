const jwt = require("jsonwebtoken");
const ReminderModel = require("../models/ReminderModel");

const CreateReminder = async (req, res) => {
  const token = req
    .header("Authorization")
    .replace("Bearer ", "")
    .replaceAll('"', "");
  const decoded = jwt.verify(token, process.env.JWT_SK);
  const setBy = decoded.user._id;

  const { setDate, name, details } = req.body;
  if ((setDate, name, details)) {
    const message = await ReminderModel.create({
      setBy,
      setDate,
      name,
      details,
    });
    res.status(201).send(message);
  } else {
    res.status(400).send("Missing fields in the form!");
  }
};

const ViewReminders = async (req, res) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  const decoded = jwt.verify(token, process.env.JWT_SK);
  const setBy = decoded.user._id;

  const reminders = await ReminderModel.find({ setBy });
  res.status(200).json(reminders);
};

module.exports = {
  CreateReminder,
  ViewReminders,
};
