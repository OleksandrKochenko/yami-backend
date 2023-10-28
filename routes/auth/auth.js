const express = require("express");
const router = express.Router();
const {
  validateUserRegister,
  validateUserLogin,
} = require("../../middlewares");
const {
  signup,
  signin,
  getCurrent,
  logout,
} = require("../../controllers/usersCtrl");
const authenticate = require("../../middlewares/authenticate");

router.post("/signup", validateUserRegister, signup);

router.post("/signin", validateUserLogin, signin);

router.get("/current", authenticate, getCurrent);

router.post("/signout", authenticate, logout);

module.exports = router;
