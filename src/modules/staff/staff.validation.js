const Joi = require("joi");
const { objectId } = require("../../validations/custom.validation");
let staffValidation = {};

staffValidation.createStaff = {
  body: Joi.object().keys({
    name: Joi.string().required("Name is required"),
    email: Joi.string().required("Email is requried").email(),
    mobile: Joi.string().required("Mobile is required"),
    type: Joi.string().required("Type is required"),
    password: Joi.string().required("Password is required"),
  }),
};

staffValidation.getStaffById = {
  params: Joi.object().keys({
    id: Joi.string().required("Staff Id is required").custom(objectId)
  }),
};

staffValidation.getAllStaff = {
  query: Joi.object().keys({}),
};

staffValidation.updateStaff = {
  params: Joi.object().keys({
    id: Joi.string().required("Staff Id is required").custom(objectId)
  }),
  body: Joi.object().keys({
    name: Joi.string().required("Name is required"),
    email: Joi.string().required("Email is requried").email(),
    mobile: Joi.string().required("Mobile is required"),
    type: Joi.string().required("Type is required"),
    password: Joi.string().required("Password is required"),
  }),
};

module.exports = staffValidation;
