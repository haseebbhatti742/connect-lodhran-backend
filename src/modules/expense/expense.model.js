const mongoose = require("mongoose");
const { toJSON, paginate } = require("../../models/plugins");

const ExpenseSchema = mongoose.Schema(
  {
    //common fields
    paymentMethod: {
      type: String,
      required: [true, "Payment Method is required"],
    },
    tid: {
      type: String,
      required: [true, "TID is required"],
    },
    amount: {
      type: String,
      required: [true, "Amount is required"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
ExpenseSchema.plugin(toJSON);
ExpenseSchema.plugin(paginate);

/**
 * @typedef Expense
 */
const Expense = mongoose.model("Expense", ExpenseSchema);

module.exports = Expense;
