const express = require("express");
const userRouter = express.Router();
const User_controller = require("../controllers/User_controller")




userRouter.post("/api/signup", User_controller.signUp);
userRouter.post("/api/login", User_controller.login);


module.exports = userRouter;