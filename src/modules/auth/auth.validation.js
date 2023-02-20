const Joi = require("joi");
const { password } = require("../../validations/custom.validation");
let authValidation = {};

authValidation.signup = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
  }),
};

authValidation.login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required().custom(password),
  }),
};

module.exports = authValidation;
