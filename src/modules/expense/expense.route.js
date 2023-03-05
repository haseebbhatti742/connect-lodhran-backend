const express = require("express");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const expenseValidation = require("./expense.validation");
const expenseController = require("./expense.controller");

const router = express.Router();

router
  .route("/")
  .post(auth(), validate(expenseValidation.createExpense), expenseController.createExpense)

router.post("/completed", 
  auth(),
  validate(expenseValidation.getAllExpenses),
  expenseController.getCompletedExpenses
);

router.get("/pending", 
  auth(),
  validate(expenseValidation.getAllExpenses),
  expenseController.getPendingExpenses
);

router.get("/approve/:id", 
  auth(),
  validate(expenseValidation.getExpenseById),
  expenseController.approveExpense
);

router
  .route("/:id")
  .get(auth(), validate(expenseValidation.getExpenseById), expenseController.getExpenseById)
  .patch(auth(), validate(expenseValidation.updateExpense), expenseController.updateExpenseById)
  .delete(auth(), validate(expenseValidation.getExpenseById), expenseController.deleteExpenseById);

module.exports = router;
