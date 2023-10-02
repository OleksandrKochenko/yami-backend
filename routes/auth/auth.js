const express = require("express");
const {
  validateUserRegister,
  validateUserLogin,
} = require("../../middlewares");
const { signup, signin } = require("../../controllers/usersCtrl");

const router = express.Router();

router.post("/signup", validateUserRegister, signup);

router.post("/signin", validateUserLogin, signin);

module.exports = router;
