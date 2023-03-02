const Joi = require("joi");
const { objectId } = require("../../validations/custom.validation");
let entryValidation = {};

entryValidation.createEntry = {
  body: Joi.object().keys({
    isp: Joi.string().required().custom(objectId),
    userId: Joi.string().required(),
    package: Joi.string().required().custom(objectId),
    paymentMethod: Joi.string().required(),
    tid: Joi.string().allow(""),
    saleRate: Joi.number().required(),
    expiryDate: Joi.date().required(),
  }),
};

entryValidation.getAlCompletedlEntries = {
  body: Joi.object().keys({
    startDate: Joi.date().required("Start Date is required"),
    endDate: Joi.date().required("End Date is required").allow(""),
    isp: Joi.string().custom(objectId).required("ISP is required"),
  }),
};

entryValidation.getAlPendingEntries = {
  query: Joi.object().keys({}),
};

entryValidation.getEntryById = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

entryValidation.updateEntry = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    isp: Joi.string().required().custom(objectId),
    userId: Joi.string().required(),
    package: Joi.string().required().custom(objectId),
    paymentMethod: Joi.string().required(),
    tid: Joi.string().allow(""),
    saleRate: Joi.number().required(),
    expiryDate: Joi.date().required(),
  }),
};

module.exports = entryValidation;
