const express = require("express");
const { SendMessage, ViewReceivedMessages, ViewSentMessages } = require("../controllers/MessageController");
const AuthMiddleware = require("../middlewares/AuthMiddleware");

const MessageRouter = express.Router();
MessageRouter.route("/sendmessage").post(AuthMiddleware, SendMessage);
MessageRouter.route("/viewreceivedmessages").get(AuthMiddleware, ViewReceivedMessages);
MessageRouter.route("/viewsentmessages").get(AuthMiddleware, ViewSentMessages);

module.exports = MessageRouter;
