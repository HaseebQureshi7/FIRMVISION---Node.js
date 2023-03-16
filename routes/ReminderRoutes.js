const express = require("express");
const {
  CreateReminder,
  ViewReminders,
} = require("../controllers/ReminderController");
const AuthMiddleware = require("../middlewares/AuthMiddleware");

const ReminderRouter = express.Router();

ReminderRouter.route("/createreminder").post(AuthMiddleware, CreateReminder);
ReminderRouter.route("/viewreminders").get(AuthMiddleware, ViewReminders);

module.exports = ReminderRouter;
