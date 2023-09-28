const { HttpError } = require("../helpers");
const { userRegisterSchema } = require("./joiSchemas/userSchemas");

const validateUserRegister = (req, res, next) => {
  const { error } = userRegisterSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  next();
};

module.exports = validateUserRegister;
