const Joi = require("joi");
const { objectId } = require("../../validations/custom.validation");
let userValidation = {};

userValidation.createUser = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
  }),
};

userValidation.getAllUsers = {
  query: Joi.object().keys({}),
};

userValidation.getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};
module.exports = userValidation;
