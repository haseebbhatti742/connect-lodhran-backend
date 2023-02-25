const mongoose = require("mongoose");
const { toJSON, paginate } = require("../../models/plugins");
const bcrypt = require("bcryptjs");

const StaffSchema = mongoose.Schema(
  {
    //common fields
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    mobile: {
      type: String,
      required: [true, "Mobile is required"],
    },
    type: {
      type: String,
      required: [true, "Type is required"],
      enum: ['superadmin', 'admin', 'staff']
    },
    password: {
      type: String,
      required: [true, "Password is required"]
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
