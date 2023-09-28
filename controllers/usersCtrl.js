const { HttpError } = require("../helpers");

const User = require("../models/user");

const signup = async (req, res, next) => {
  try {
    // check if email is unique, if not - throw an error with custom text
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw HttpError(409, "Email already in use");
    }

    const newUser = await User.create(req.body);
    res.status(201).json({
      name: newUser.name,
      email: newUser.email,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
};
