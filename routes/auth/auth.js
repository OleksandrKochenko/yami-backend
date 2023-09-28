const express = require("express");
const { validateUserRegister } = require("../../middlewares");
const { signup } = require("../../controllers/usersCtrl");

const router = express.Router();

router.post("/signup", validateUserRegister, signup);

module.exports = router;
