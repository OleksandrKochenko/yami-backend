const Joi = require("joi");
const {
  userEmailRegExp,
  userEmailMessage,
  userPasswordMessage,
  userNameMessage,
} = require("../../constants/userConstants");

const userRegisterSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({
      "any.required": `${userNameMessage}`,
    }),
  email: Joi.string()
    .pattern(userEmailRegExp)
    .required()
    .messages({
      "any.required": `${userEmailMessage}`,
      "string.pattern.base": `invalid email`,
    }),
  password: Joi.string()
    .min(6)
    .required()
    .messages({
      "any.required": `${userPasswordMessage}`,
      "string.min": "invalid length of password",
    }),
});

const userLoginSchema = Joi.object({
  email: Joi.string()
    .pattern(userEmailRegExp)
    .required()
    .messages({
      "any.required": `${userEmailMessage}`,
      "string.pattern.base": `invalid email`,
    }),
  password: Joi.string()
    .required()
    .messages({
      "any.required": `${userPasswordMessage}`,
    }),
});

module.exports = { userRegisterSchema, userLoginSchema };
