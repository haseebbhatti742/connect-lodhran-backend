const Joi = require("joi");
const { password } = require("../../validations/custom.validation");
let authValidation = {};

authValidation.login = {
  body: Joi.object().keys({
    email: Joi.string().required("Email/Mobile is requried"),
    password: Joi.string().required("Password is required"),
  }),
};

module.exports = authValidation;
