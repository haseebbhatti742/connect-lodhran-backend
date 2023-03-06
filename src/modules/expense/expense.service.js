const httpStatus = require("http-status");
const ExpenseModel = require("./expense.model");
let expenseService = {};

/**
 * Ceate Expense
 * @param {Object} ExpenseBody
 * @returns {Promise<ExpenseModel>}
 */
expenseService.createExpense = async (ExpenseBody) => {
  return await ExpenseModel.create(ExpenseBody);
};

/**
 * Get Expense by expense by Id
 * @param {ObjectId} id
 * @returns {Promise<ExpenseModel>}
 */
expenseService.getExpenseById = async (id) => {
  return ExpenseModel.findById(id).populate("staff");
};

/**
 * Get All Expenses
 * @param {String} startDate
 * @param {String} endDate
 * @returns {Promise<ExpenseModel>}
 */
expenseService.getAllExpenses = async (startDate, endDate) => {
  return ExpenseModel.find({
    date:
      endDate === "" || startDate === endDate
        ? new Date(startDate)
        : { $gte: new Date(startDate), $lte: new Date(endDate) },
  })
    .sort({ date: 1 })
    .populate("staff");
};

/**
 * Get All Expenses By Status
 * @param {String} status
 * @returns {Promise<ExpenseModel>}
 */
expenseService.getAllExpensesByStatus = async (status) => {
  return ExpenseModel.find({ status }).populate("staff");
};

/**
 * Update Expense By Id
 * @param {ObjectId} id
 * @param {Object} updateBody
 * @returns {Promise<ExpenseModel>}
 */
expenseService.updateExpenseById = async (id, updateBody) => {
  await ExpenseModel.updateOne({ _id: id }, updateBody).populate("staff");
  return "Expense Updated";
};

/**
 * Delete Expense By Id
 * @param {ObjectId} id
 */
expenseService.deleteExpenseById = async (id) => {
  await ExpenseModel.deleteOne({ _id: id }).populate("staff");
  return "Expense Deleted";
};

module.exports = expenseService;
