const Joi = require("joi");
const { objectId } = require("../../validations/custom.validation");
let expenseValidation = {};

expenseValidation.createExpense = {
  body: Joi.object().keys({
    spentBy: Joi.string().required("Spent By is required"),
    paymentMethod: Joi.string().required("Payment Method is required"),
    tid: Joi.string().allow(""),
    amount: Joi.number().required("Amount is required"),
    date: Joi.date().required("Date is required"),
    details: Joi.string().required("Details are required"),
  }),
};

expenseValidation.getAllExpenses = {
  query: Joi.object().keys({}),
};

expenseValidation.getAllCompletedExpenses = {
  body: Joi.object().keys({
    startDate: Joi.date().required("Start Date is required"),
    endDate: Joi.date().required("End Date is required").allow(""),
  }),
};

expenseValidation.getExpenseById = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

expenseValidation.updateExpense = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    spentBy: Joi.string().required("Spent By is required"),
    paymentMethod: Joi.string().required("Payment Method is required"),
    tid: Joi.string().allow(""),
    amount: Joi.number().required("Amount is required"),
    date: Joi.date().required("Date is required"),
    details: Joi.string().required("Details are required"),
  }),
};

module.exports = expenseValidation;
