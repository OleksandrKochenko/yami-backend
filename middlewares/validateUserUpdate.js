const { HttpError } = require("../helpers");
const { userUpdateSchema } = require("./joiSchemas/userSchemas");

const validateUserUpdate = (req, res, next) => {
  const { error } = userUpdateSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  next();
};

module.exports = validateUserUpdate;
