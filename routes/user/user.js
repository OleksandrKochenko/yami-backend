const express = require("express");
const router = express.Router();
const authenticate = require("../../middlewares/authenticate");
const { validateUserUpdate } = require("../../middlewares");
const { updateUser } = require("../../controllers/usersCtrl");

router.use(authenticate);

router.put("/update", validateUserUpdate, updateUser);

module.exports = router;
