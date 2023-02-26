const mongoose = require("mongoose");
const { toJSON, paginate } = require("../../models/plugins");

const IspSchema = mongoose.Schema(
  {
    //common fields
    name: {
      type: String,
      required: [true, "Isp Name is required"],
    },
    vlan: {
      type: Number,
      required: [true, "Isp VLAN is required"],
    },
    color: {
      type: String,
      required: [true, "Isp Color is required"],
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
    strictPopulate: false
  }
);

// add plugin that converts mongoose to json
IspSchema.plugin(toJSON);
IspSchema.plugin(paginate);

/**
 * @typedef Isp
 */
const Isp = mongoose.model("Isp", IspSchema);

module.exports = Isp;
