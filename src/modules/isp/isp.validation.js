const Joi = require("joi");
const { objectId } = require("../../validations/custom.validation");
let ispValidation = {};

ispValidation.createIsp = {
  body: Joi.object().keys({
    name: Joi.string().required("Name is requried"),
    vlan: Joi.number().min(0).required("Vlan is required"),
    openingBalance: Joi.number().min(0).required("Opening Balance is required"),
    color: Joi.string().required("Color is required"),
  }),
};

ispValidation.getAllIsps = {
  query: Joi.object().keys({}),
};

ispValidation.getIspById = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

ispValidation.updateIsp = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    body: Joi.object().keys({
      name: Joi.string().required("Name is requried"),
      vlan: Joi.number().min(0).required("Vlan is required"),
      openingBalance: Joi.number().min(0).required("Opening Balance is required"),
      color: Joi.string().required("Color is required"),
    }),
  }),
};
module.exports = ispValidation;
