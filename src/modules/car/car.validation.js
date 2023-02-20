const Joi = require("joi");
const { objectId } = require("../../validations/custom.validation");
let carValidation = {};

carValidation.createCar = {
  body: Joi.object().keys({
    category: Joi.string().required().custom(objectId),
    registrationNumber: Joi.string().required(),
    make: Joi.string().required(),
    model: Joi.number().min(1998).required(),
    color: Joi.string().required(),
  }),
};

carValidation.getAllCars = {
  query: Joi.object().keys({}),
};

carValidation.getCarById = {
  params: Joi.object().keys({
    carId: Joi.string().custom(objectId),
  }),
};

carValidation.updateCar = {
  params: Joi.object().keys({
    carId: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    id: Joi.string().required().custom(objectId),
    category: Joi.string().required().custom(objectId),
    registrationNumber: Joi.string().required(),
    make: Joi.string().required(),
    model: Joi.number().min(1998).required(),
    color: Joi.string().required(),
  }),
};
module.exports = carValidation;
