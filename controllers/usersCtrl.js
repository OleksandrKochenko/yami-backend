const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { SECRET_KEY } = process.env;

const { HttpError } = require("../helpers");
const User = require("../models/user");
const { avatarBaseUrl, avatarSettings } = require("../constants/userConstants");

const signup = async (req, res, next) => {
  try {
    // check if email is unique, if not - throw an error with custom text
    const { email, password, name } = req.body;
    const user = await User.findOne({ email });
    if (user) throw HttpError(409, "Email already in use");

    const hashedPswrd = await bcrypt.hash(password, 10);

    const avatarLink =
      avatarBaseUrl + `?name=${name.replace(/ /g, "+")}` + avatarSettings;

    const newUser = await User.create({
      ...req.body,
      password: hashedPswrd,
      avatarURL: avatarLink,
    });

    res.status(201).json({
      name: newUser.name,
      email: newUser.email,
      avatarURL: newUser.avatarURL,
    });
  } catch (error) {
    next(error);
  }
};

const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw HttpError(401, "Email or password is wrong");

    const pswrdCompare = await bcrypt.compare(password, user.password);
    if (!pswrdCompare) throw HttpError(401, "Email or password is wrong");

    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

    await User.findByIdAndUpdate(user._id, { token });

    res.json({ token, email, name: user.name, avatarURL: user.avatarURL });
  } catch (error) {
    next(error);
  }
};

const getCurrent = async (req, res, next) => {
  try {
    const { name, email, avatarURL } = req.user;
    res.json({ name, email, avatarURL });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });
    res.status(204).json({ message: "Logout success" });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { name, password } = req.body;
    if (!name && !password)
      throw HttpError(400, "Email or password is not provided");
    const hashedPswrd = password && (await bcrypt.hash(password, 10));
    const user =
      (name &&
        (await User.findOneAndUpdate(
          _id,
          { name },
          {
            returnDocument: "after", // returns document after update
            projection: { email: 1, name: 1, avatarURL: 1, token: 1 }, // returns listed fields of document
          }
        ))) ||
      (password &&
        (await User.findOneAndUpdate(
          _id,
          { password: hashedPswrd },
          {
            returnDocument: "after", // returns document after update
            projection: { email: 1, name: 1, avatarURL: 1, token: 1 }, // returns listed fields of document
          }
        )));
    res.json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  signin,
  getCurrent,
  logout,
  updateUser,
};
