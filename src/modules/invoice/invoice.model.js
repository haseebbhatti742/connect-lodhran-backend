const mongoose = require("mongoose");
const { toJSON, paginate } = require("../../models/plugins");

const EntrySchema = mongoose.Schema(
  {
    //common fields
    isp: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Isp",
      required: [true, "Isp is required"],
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
    paymentMethod: {
      type: String,
      required: [true, "Payment Method is required"],
    },
    tid: {
      type: String,
      required: [true, "TID is required"],
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
    },
    comments: {
      type: String,
      required: [true, "Comments are required"],
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
EntrySchema.plugin(toJSON);
EntrySchema.plugin(paginate);

/**
 * @typedef Invoice
 */
const Invoice = mongoose.model("Invoice", EntrySchema);

module.exports = Invoice;
