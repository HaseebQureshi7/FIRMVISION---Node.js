const jwt = require("jsonwebtoken");
const EmployeeModel = require("../models/EmployeeModel");

// SIGNUP
const SignupEmployee = async (req, res) => {
  const { email, name, phone, companyName, password, employeeOf, position } =
    req.body;

  if ((email, name, phone, companyName, password, employeeOf, position)) {
    const duplicateEntry = await EmployeeModel.findOne({ email });
    if (duplicateEntry) {
      res.status(409).send("Account already exists on this email!");
    } else {
      const newEmployee = await EmployeeModel.create(req.body);

      if (newEmployee) {
        const { password, ...user } = newEmployee.toObject();
        const token = jwt.sign(JSON.stringify({ user }), process.env.JWT_SK);
        res.status(201).json(token);
      } else {
        res.status(400).send("Employee not created!");
      }
    }
  } else {
    res.status(400).send("Incomplete Form Submitted!");
  }
};

// LOGIN
const LoginEmployee = async (req, res) => {
  const { email, password, token } = req.body;
  if (token) {
    try {
      const verification = jwt.verify(token, process.env.JWT_SK);
      const userEmail = verification.user.email;
      const user = await EmployeeModel.findOne({ email: userEmail }).select(
        "-password"
      );
      if (!user) {
        res.status(400).send("Invalid Login Data");
      } else {
        res.status(200).send(user);
      }
    } catch (err) {
      res.status(400).send(err);
    }
  } else {
    const user = await EmployeeModel.findOne({ email, password }).select(
      "-password"
    );

    if (!user) {
      res.status(401).send("Invalid email or password");
    } else {
      const token = jwt.sign(JSON.stringify({ user }), process.env.JWT_SK);
      res.status(200).json({ user, token });
    }
  }
};

// EDIT PROFILE
const EditProfile = async (req, res) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  const decoded = jwt.verify(token, process.env.JWT_SK);
  const uid = decoded.user._id;
  try {
    const updatedUser = await EmployeeModel.findOneAndUpdate(
      { _id: uid },
      { $set: req.body },
      { new: true, runValidators: true }
    ).select("-password");
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// GET TEAM
const GetTeam = async (req, res) => {
  const token = req
    .header("Authorization")
    .replace("Bearer ", "")
    .replaceAll('"', "");
  try {
    const decoded = jwt.verify(token, process.env.JWT_SK);
    const employeeOf = decoded.user.employeeOf;
    const employees = await EmployeeModel.find({ employeeOf });
    if (employees.length > 0) {
      res.status(200).json(employees);
    } else {
      res.status(204).send("No Employees Found!");
    }
  } catch {
    res.status(401).send("Invalid Token!");
  }
};

module.exports = {
  SignupEmployee,
  LoginEmployee,
  EditProfile,
  GetTeam,
};
