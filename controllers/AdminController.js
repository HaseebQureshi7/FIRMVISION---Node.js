const jwt = require("jsonwebtoken");
const AdminModel = require("../models/AdminModel");
const GMailTransport = require("../config/NodeMailer");
const EmployeeModel = require("../models/EmployeeModel");
const TaskModel = require("../models/TaskModel");
const ReminderModel = require("../models/ReminderModel");
const gMail = process.env.GMAIL;

// SIGNUP
const SignupAdmin = async (req, res) => {
  const { email, name, phone, companyName, password } = req.body;

  if ((email, name, phone, companyName, password)) {
    const duplicateEntry = await AdminModel.findOne({ email });
    if (duplicateEntry) {
      res.status(409).send("Account already exists on this email!");
    } else {
      const newUser = await AdminModel.create(req.body);

      if (newUser) {
        const { password, ...user } = newUser.toObject();
        const token = jwt.sign(JSON.stringify({ user }), process.env.JWT_SK);
        res.status(201).json({ token, user });
        // WELCOME MAIL
        const mailData = {
          from: gMail,
          to: email,
          subject: `Welcome to FIRMVISION`,
          html: `<h4>Dear ${name}<h4/><h5>I, Haseeb Qureshi, wanted to extend my sincerest gratitude for taking the time to sign up for our application, FIRMVISION. We are excited to have you as part of our community and look forward to providing you with a seamless and enriching experience.<h5/><br/><h5>Should you have any concerns, please do not hesitate to reach out to our customer service team. We value your feedback and always aim to provide the best service possible.</h5><br/><h5>Thank you again for entrusting us with your business.</h5><br/><h4>Haseeb Qureshi</h4>`,
        };
        GMailTransport.sendMail(mailData, (err) => {
          if (err) {
            console.log(`Error sending Welcome Mail, ${err}`);
          } else {
            console.log("Welcome Mail Sent!");
          }
        });
      } else {
        res.status(400).send("User not created!");
      }
    }
  } else {
    res.status(400).send("Incomplete Form Submitted!");
  }
};

// LOGIN
const LoginAdmin = async (req, res) => {
  const { email, password, token } = req.body;
  if (token) {
    try {
      const verification = jwt.verify(token, process.env.JWT_SK);
      const userEmail = verification.user.email;
      const user = await AdminModel.findOne({ email: userEmail }).select(
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
    const user = await AdminModel.findOne({ email, password }).select(
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
    const updatedUser = await AdminModel.findOneAndUpdate(
      { _id: uid },
      { $set: req.body },
      { new: true, runValidators: true }
    ).select("-password");
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// SEND A JOINING MAIL TO EMPLOYEE
const AddEmployee = async (req, res) => {
  const { url, employeeName, employeeEmail, adminName, companyName } = req.body;

  if (url && employeeEmail && adminName && employeeName && companyName) {
    const duplicateEntry = await EmployeeModel.findOne({
      email: employeeEmail,
    });
    if (!duplicateEntry) {
      const mailData = {
        from: gMail,
        to: employeeEmail,
        subject: `Invitation Link from ${companyName}`,
        html: `<h3>Hi ${employeeName}<h3/><h4>${adminName} has sent you a joining link, click the link below to join team.<h4/> <h4>Click <a href=${url}>here</a> to join the team</h4>`,
      };
      GMailTransport.sendMail(mailData, (err) => {
        if (err) {
          res.status(400).send(`Error sending Join Mail! , ${err}`);
        } else {
          res.status(200).send("Joining Mail Sent!");
        }
      });
    } else {
      res.status(400).send("Email already in use!");
    }
  } else {
    res.status(404).send("Fields Missing !!!");
  }
};

const GetEmployees = async (req, res) => {
  const token = req
    .header("Authorization")
    .replace("Bearer ", "")
    .replaceAll('"', "");
  try {
    const decoded = jwt.verify(token, process.env.JWT_SK);
    const adminId = decoded.user._id;
    const employees = await EmployeeModel.find({ employeeOf: adminId });
    if (employees.length > 0) {
      res.status(200).json(employees);
    } else {
      res.status(204).send("No Employees Found!");
    }
  } catch {
    res.status(401).send("Invalid Token!");
  }
};

const GetAllAssignedTasks = async (req, res) => {
  const token = req
    .header("Authorization")
    .replace("Bearer ", "")
    .replaceAll('"', "");
  try {
    const decoded = jwt.verify(token, process.env.JWT_SK);
    const adminId = decoded.user._id;
    const assignedTasks = await TaskModel.find({ assignedBy: adminId });
    if (assignedTasks.length > 0) {
      res.status(200).json(assignedTasks);
    } else {
      res.status(200).send("No Tasks Found!");
    }
  } catch {
    res.status(401).send("Invalid Token!");
  }
};

const GetReminders = async (req, res) => {
  const token = req
    .header("Authorization")
    .replace("Bearer ", "")
    .replaceAll('"', "");

  const parsedToday = new Date().toISOString();
  try {
    const decoded = jwt.verify(token, process.env.JWT_SK);
    const adminId = decoded.user._id;
    const reminders = await ReminderModel.find({
      setBy: adminId,
      setDate: { $gte: parsedToday },
    });
    if (reminders.length > 0) {
      res.status(200).json(reminders);
    } else {
      res.status(204).send("No Reminders Found!");
    }
  } catch {
    res.status(401).send("Invalid Token!");
  }
};

module.exports = {
  SignupAdmin,
  LoginAdmin,
  EditProfile,
  AddEmployee,
  GetEmployees,
  GetAllAssignedTasks,
  GetReminders,
};
