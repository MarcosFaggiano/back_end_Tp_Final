const express = require("express");
const messageRouter = express.Router();
const Message_controller = require("../controllers/Message_controller")





messageRouter.delete("/api/messages/:id", Message_controller.deleteMessage);
messageRouter.put("/api/messages/read/:id", Message_controller.readMessage);






module.exports = messageRouter;