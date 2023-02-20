const Joi = require("joi");
const { objectId } = require("../../validations/custom.validation");
let categoryValidation = {};

categoryValidation.createCategory = {
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
};

categoryValidation.getAllCategories = {
  query: Joi.object().keys({}),
};

categoryValidation.getCategory = {
  params: Joi.object().keys({
    category: Joi.string().custom(objectId),
  }),
};

categoryValidation.updateCategory = {
  params: Joi.object().keys({
    category: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
};
module.exports = categoryValidation;
