const jwt = require("jsonwebtoken");
const TaskModel = require("../models/TaskModel");

const CreateTask = async (req, res) => {
  const token = req.header("Authorization").replace("Bearer ", "").replaceAll('"', "");
  const decoded = jwt.verify(token, process.env.JWT_SK);
  const assignedBy = decoded.user._id;

  const { assignedTo, name, details, deadline, priority } = req.body;
  if ((assignedTo, name, details, deadline, priority)) {
    const task = await TaskModel.create({
      assignedTo,
      assignedBy,
      name,
      details,
      deadline,
      priority,
    });
    res.status(201).send(task);
  } else {
    res.status(400).send("Missing fields in the form!");
  }
};

// Update Task
const UpdateTask = async (req, res) => {
  const tid = req.params.tid;

  try {
    const updatedTask = await TaskModel.findOneAndUpdate(
      { _id: tid },
      { $set: req.body },
      { new: true, runValidators: true }
    );
    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ONLY GET ONE EMPLOYEE'S TASKS
const ViewEmployeesTasks = async (req, res) => {
  // const eid = req.params.eid;
  const token = req.header("Authorization").replace("Bearer ", "").replaceAll('"', "");
  const decoded = jwt.verify(token, process.env.JWT_SK);
  const assignedTo = decoded.user._id;

  const tasks = await TaskModel.find({ assignedTo });
  res.status(200).json(tasks);
};

// GET ALL TASKS ASSIGNED BY THE ADMIN
const ViewAssignedAdminTasks = async (req, res) => {
  const token = req.header("Authorization").replace("Bearer ", "").replaceAll('"', "");
  const decoded = jwt.verify(token, process.env.JWT_SK);
  const assignedBy = decoded.user._id;

  const tasks = await TaskModel.find({ assignedBy });
  res.status(200).json(tasks);
};

module.exports = {
  CreateTask,
  UpdateTask,
  ViewEmployeesTasks,
  ViewAssignedAdminTasks,
};
