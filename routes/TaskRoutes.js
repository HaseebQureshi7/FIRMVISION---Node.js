const express = require("express");
const AuthMiddleware = require("../middlewares/AuthMiddleware");
const {
  CreateTask,
  UpdateTask,
  ViewAssignedAdminTasks,
  ViewEmployeesTasks,
} = require("../controllers/TaskController");

const TaskRouter = express.Router();

TaskRouter.route("/createtask").post(AuthMiddleware, CreateTask);
TaskRouter.route("/updatetask/:tid").put(AuthMiddleware, UpdateTask);
TaskRouter.route("/viewemployeetasks").get(AuthMiddleware, ViewEmployeesTasks);
TaskRouter.route("/viewassignedadmintasks").get(
  AuthMiddleware,
  ViewAssignedAdminTasks
);

module.exports = TaskRouter;
