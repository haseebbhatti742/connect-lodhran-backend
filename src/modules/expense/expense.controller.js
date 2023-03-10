const httpStatus = require("http-status");
const ApiError = require("../../utils/ApiError");
const catchAsync = require("../../utils/catchAsync");
const { expenseService, staffService } = require("../../services");
const { sendEmail } = require("../../services/email.service");
const { getPaymentMethodNameByKey } = require("../../utils/helpers");
const { STAFF_TYPES } = require("../../utils/Constants");
let expenseController = {};

expenseController.createExpense = catchAsync(async (req, res) => {
  const admin = await staffService.getStaffsByType(STAFF_TYPES.admin);
  if (!admin || admin.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, "Admin not found");
  } else {
    let newExpense = req?.body;
    if (
      req?.user?.type !== STAFF_TYPES.admin &&
      req?.body?.amount > 999 &&
      req?.body?.paymentMethod !== "meezan_bank"
    ) {
      newExpense = {
        ...newExpense,
        staff: req?.user?.id,
        status: "pending",
      };
    } else {
      newExpense = {
        ...newExpense,
        staff: req?.user?.id,
        status: "completed",
      };
    }
    const expense = await expenseService.createExpense(newExpense);
    if (expense) {
      const approveLink = `<a href="${process.env.BASE_URL}/expense/admin-approve/${expense?.id}"><button style="background-color: green; color:white; padding:20px; border:0px solid white; border-radius:10px; margin-right: 40px">Approve</button></a>`;
      const declineLink = `<a href="${process.env.BASE_URL}/expense/admin-decline/${expense?.id}"><button style="background-color: red; color:white; padding:20px; border:0px solid white; border-radius:10px">Decline</button></a>`;
      sendEmail(
        admin[0]?.email,
        "New Expense Added",
        `<html><body><p>A new expense of ${expense?.amount} is added by ${
          req?.user?.fullname
        }.
        <br>Details: ${expense?.details}
        <br>Date: ${expense?.date}
        <br>Payment Method: ${getPaymentMethodNameByKey(expense?.paymentMethod)}
        <br>TID: ${expense?.tid}
        <br>Status: ${newExpense?.status}
        <br>${approveLink} &nbsp;${declineLink}</p></body></html>`
      );
      res.status(httpStatus.CREATED).send(expense);
    } else {
      throw new ApiError(httpStatus.NOT_ACCEPTABLE, "Something went wrong");
    }
  }
});

expenseController.getAllExpenses = catchAsync(async (req, res) => {
  const expenses = await expenseService.getAllExpenses();
  if (!expenses || expenses.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, "No Expenses Yet");
  }
  res.send(expenses);
});

expenseController.getCompletedExpenses = catchAsync(async (req, res) => {
  const expenses = await expenseService.getAllExpenses(
    req?.body?.startDate,
    req?.body?.endDate
  );
  if (!expenses || expenses.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, "No Completed Expenses Yet");
  }

  const newExpenses = await Promise.all(
    expenses.map(async (expense) => {
      if (expense?.spentBy !== "company") {
        const spentBy = await staffService.getStaffById(expense?.spentBy);
        return {
          ...expense._doc,
          spentBy,
        };
      } else {
        return expense;
      }
    })
  );

  res.send({
    expenses: newExpenses,
    total: expenses.reduce(
      (acc, item) => (acc += item?.status === "completed" ? +item?.amount : 0),
      0
    ),
  });
});

expenseController.getPendingExpenses = catchAsync(async (req, res) => {
  const expenses = await expenseService.getAllExpensesByStatus("pending");
  if (!expenses || expenses.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, "No Pending Expenses Yet");
  }
  res.send({
    expenses,
    total: expenses.reduce((acc, item) => (acc += +item?.amount), 0),
  });
});

expenseController.approveExpense = catchAsync(async (req, res) => {
  const expense = await expenseService.getExpenseById(req?.params?.id);
  if (!expense || expense?.status !== "pending")
    throw new ApiError(httpStatus.NOT_FOUND, "Expense Not Found");
  else {
    const Expense = await expenseService.updateExpenseById(req?.params?.id, {
      status: "completed",
    });
    res.send(Expense);
  }
});

expenseController.approveExpenseByAdmin = catchAsync(async (req, res) => {
  const expense = await expenseService.getExpenseById(req?.params?.id);
  if (!expense || expense?.status !== "pending") res.send("Expense Not Found");
  else {
    const Expense = await expenseService.updateExpenseById(req?.params?.id, {
      status: "completed",
    });
    if (Expense) {
      sendEmail(
        expense?.staff?.email,
        "Expense Approved",
        `<html><body><p>The expense you added was approved by Admin.
        <br>Details: ${expense?.details}
        <br>Amount: ${expense?.amount}
        <br>Date: ${expense?.date}
        <br>Payment Method: ${getPaymentMethodNameByKey(expense?.paymentMethod)}
        <br>TID: ${expense?.tid}</p></body></html>`
      );
      res.send("Expense Approved");
    } else {
      res.send("Something went wrong");
    }
  }
});

expenseController.declineExpenseByAdmin = catchAsync(async (req, res) => {
  const expense = await expenseService.getExpenseById(req?.params?.id);
  if (!expense || expense?.status !== "pending") res.send("Expense Not Found");
  else {
    const Expense = await expenseService.deleteExpenseById(req?.params?.id);
    if (Expense) {
      sendEmail(
        expense?.staff?.email,
        "Expense Declined",
        `<html><body><p>The expense you added was declined by Admin.
        <br>Details: ${expense?.details}
        <br>Amount: ${expense?.amount}
        <br>Date: ${expense?.date}
        <br>Payment Method: ${getPaymentMethodNameByKey(expense?.paymentMethod)}
        <br>TID: ${expense?.tid}</p></body></html>`
      );
      res.send("Expense Declined");
    } else {
      res.send("Something went wrong");
    }
  }
});

expenseController.getExpenseById = catchAsync(async (req, res) => {
  const expense = await expenseService.getExpenseById(req.params.expenseId);
  if (!expense) {
    throw new ApiError(httpStatus.NOT_FOUND, "Expense not found");
  }
  res.send(expense);
});

expenseController.updateExpenseById = catchAsync(async (req, res) => {
  const expense = await expenseService.getExpenseById(req?.params?.id);
  if (!expense) throw new ApiError(httpStatus.NOT_FOUND, "Expense Not Found");
  else {
    const Expense = await expenseService.updateExpenseById(
      req?.params?.id,
      req?.body
    );
    res.send(Expense);
  }
});

expenseController.deleteExpenseById = catchAsync(async (req, res) => {
  const expense = await expenseService.getExpenseById(req?.params?.id);
  if (!expense) throw new ApiError(httpStatus.NOT_FOUND, "Expense Not Found");
  else {
    const Expense = await expenseService.deleteExpenseById(req?.params?.id);
    res.send(Expense);
  }
});

module.exports = expenseController;
