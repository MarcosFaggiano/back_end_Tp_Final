const express = require("express");
const router = express.Router();
const User_controller = require("../controllers/User_controller");

router.get("/api/list", User_controller.list); //Trae todos los usuarios
router.get("/api/users/:username/messages/sent",User_controller.sentMessagesById); //Trae el buzon de salida
router.get("/api/users/:username/messages/inbox",User_controller.receivedMessagesById); //Trae el buzon de entrada


router.post("/api/users/:username/messages", User_controller.SendMessageToId);
router.post("/api/signup", User_controller.signUp);
// userRouter.post("/api/login", User_controller.login);

module.exports = router;
