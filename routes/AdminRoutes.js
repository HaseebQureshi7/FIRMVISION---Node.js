const express = require("express");
const {
  LoginAdmin,
  SignupAdmin,
  EditProfile,
  AddEmployee,
  GetEmployees,
  GetAllAssignedTasks,
  GetReminders,
} = require("../controllers/AdminController");
const AuthMiddleware = require("../middlewares/AuthMiddleware");

const AdminRouter = express.Router();

AdminRouter.route("/signup").post(SignupAdmin);
AdminRouter.route("/login").post(LoginAdmin);
AdminRouter.route("/editprofile").put(AuthMiddleware, EditProfile);
AdminRouter.route("/addemployee").post(AuthMiddleware, AddEmployee);
AdminRouter.route("/getemployees").post(AuthMiddleware, GetEmployees);
AdminRouter.route("/getallassignedtasks").post(AuthMiddleware, GetAllAssignedTasks);
AdminRouter.route("/getreminders").post(AuthMiddleware, GetReminders);


module.exports = AdminRouter;