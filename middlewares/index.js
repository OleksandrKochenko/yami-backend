const handleMongooseError = require("./handleMongooseError");
const isValidId = require("./isValidId");
const validateUserRegister = require("./validateUserRegister");
const validateUserLogin = require("./validateUserLogin");
const validateUserUpdate = require("./validateUserUpdate");
const upload = require("./uploads");
const isFileUpload = require("./isFileUpload");

module.exports = {
  handleMongooseError,
  isValidId,
  validateUserRegister,
  validateUserLogin,
  validateUserUpdate,
  upload,
  isFileUpload,
};
