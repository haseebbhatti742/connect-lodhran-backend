const Joi = require("joi");
const {
  objectId,
  cnic,
  mobile,
} = require("../../validations/custom.validation");
let userValidation = {};

userValidation.createUser = {
  body: Joi.object().keys({
    fullname: Joi.string().required(),
    email: Joi.string().email().allow(""),
    userId: Joi.string().required(),
    cnic: Joi.string().required().custom(cnic),
    mobile: Joi.string().required().custom(mobile),
    address: Joi.string().required(),
    sendWelcomeMessage: Joi.boolean().required(),
  }),
};

userValidation.getAllUsers = {
  query: Joi.object().keys({}),
};

userValidation.getUser = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

userValidation.updateUser = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    fullname: Joi.string(),
    email: Joi.string().email().allow(""),
    userId: Joi.string(),
    cnic: Joi.string().custom(cnic),
    mobile: Joi.string().custom(mobile),
    address: Joi.string(),
    sendWelcomeMessage: Joi.boolean(),
  }),
};

module.exports = userValidation;
