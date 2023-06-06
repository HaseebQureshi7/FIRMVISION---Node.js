const express = require("express");
const {
  LoginAdmin,
  SignupAdmin,
  EditProfile,
  AddEmployee,
  GetEmployees,
  GetAllAssignedTasks,
  GetReminders,
  GoogleLoginAdmin,
  GetAdminDetails,
} = require("../controllers/AdminController");
const AuthMiddleware = require("../middlewares/AuthMiddleware");

const AdminRouter = express.Router();

AdminRouter.route("/signup").post(SignupAdmin);
AdminRouter.route("/login").post(LoginAdmin);
AdminRouter.route("/loginwithgoogle").post(GoogleLoginAdmin);
AdminRouter.route("/editprofile").put(AuthMiddleware, EditProfile);
AdminRouter.route("/addemployee").post(AuthMiddleware, AddEmployee);
AdminRouter.route("/getemployees").post(AuthMiddleware, GetEmployees);
AdminRouter.route("/getadmindetails/:uid").post(GetAdminDetails);
AdminRouter.route("/getallassignedtasks").post(
  AuthMiddleware,
  GetAllAssignedTasks
);
AdminRouter.route("/getreminders").post(AuthMiddleware, GetReminders);

module.exports = AdminRouter;
