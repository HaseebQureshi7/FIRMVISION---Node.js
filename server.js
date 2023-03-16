const express = require("express");
const cors = require("cors");
const { urlencoded, json } = require("express");
const connectToMongoose = require("./config/ConnectToDb");
const AdminRouter = require("./routes/AdminRoutes");
const EmployeeRouter = require("./routes/EmployeeRoutes");
const TaskRouter = require("./routes/TaskRoutes");
const MessageRouter = require("./routes/MessageRoutes");
const ReminderRouter = require("./routes/ReminderRoutes");
require("dotenv").config();

const App = express();
const PORT = process.env.PORT || 5000;

connectToMongoose();

App.use(cors({ extended: false, limit: "2mb" }));
App.use(urlencoded({ extended: false, limit: "2mb" }));
App.use(json({ extended: false, limit: "2mb" }));

App.use("/admin", AdminRouter);
App.use("/employee", EmployeeRouter);
App.use("/task", TaskRouter);
App.use("/message", MessageRouter);
App.use("/reminder", ReminderRouter);

App.listen(PORT, () => {
  console.log(`Server Stated at http://localhost:${PORT}`);
});
