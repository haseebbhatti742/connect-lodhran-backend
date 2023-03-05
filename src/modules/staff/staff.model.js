const mongoose = require("mongoose");
const { toJSON, paginate } = require("../../models/plugins");
const bcrypt = require("bcryptjs");
const { STAFF_TYPES } = require('../../utils/Constants')

const StaffSchema = mongoose.Schema(
  {
    //common fields
    fullname: {
      type: String,
      required: [true, "Full Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"]
    },
    cnic: {
      type: String,
      required: [true, "CNIC is required"],
    },
    mobile: {
      type: String,
      required: [true, "Mobile is required"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    type: {
      type: String,
      required: [true, "Type is required"],
      enum: [STAFF_TYPES.admin, STAFF_TYPES.partner, STAFF_TYPES.staff]
    },
    share: {
      type: Number,
      required: [this.type === STAFF_TYPES.partner || this.type === STAFF_TYPES.admin ? true: false,"Share is required when type is partner"]
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
StaffSchema.plugin(toJSON);
StaffSchema.plugin(paginate);

/**
 * Check if password matches the Staff's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
StaffSchema.methods.isPasswordMatch = async function (password) {
  const Staff = this;
  return bcrypt.compare(password, Staff.password);
};

StaffSchema.pre("save", async function (next) {
  const Staff = this;
  if (Staff.isModified("password")) {
    Staff.password = await bcrypt.hash(Staff.password, 8);
  }
  next();
});

/**
 * @typedef Staff
 */
const Staff = mongoose.model("Staff", StaffSchema);

module.exports = Staff;
