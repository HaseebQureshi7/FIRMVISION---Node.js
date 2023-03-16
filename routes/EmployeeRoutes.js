const express = require("express");
const AuthMiddleware = require("../middlewares/AuthMiddleware");
const {
  SignupEmployee,
  LoginEmployee,
  EditProfile,
} = require("../controllers/EmployeeController");

const EmployeeRouter = express.Router();

EmployeeRouter.route("/signup").post(SignupEmployee);
EmployeeRouter.route("/login").post(LoginEmployee);
EmployeeRouter.route("/editprofile").put(AuthMiddleware, EditProfile);

module.exports = EmployeeRouter;
