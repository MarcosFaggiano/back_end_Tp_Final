const express = require("express");
const router = express.Router();
const User_controller = require("../controllers/User_controller")


router.get("/api/list", User_controller.list);

router.post("/api/signup", User_controller.signUp);
// userRouter.post("/api/login", User_controller.login);


module.exports = router;