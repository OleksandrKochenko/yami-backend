const { HttpError } = require("../helpers");
const { userLoginSchema } = require("./joiSchemas/userSchemas");

const validateUserLogin = (req, res, next) => {
  const { error } = userLoginSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  next();
};

module.exports = validateUserLogin;
