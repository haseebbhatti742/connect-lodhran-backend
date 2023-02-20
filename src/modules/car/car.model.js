const mongoose = require("mongoose");
const { toJSON, paginate } = require("../../models/plugins");

const CarSchema = mongoose.Schema(
  {
    //common fields
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      cascade: true
    },
    registrationNumber: {
      type: String,
      required: true,
    },
    make: {
      type: String,
      required: true,
    },
    model: {
      type: Number,
      min: 1998,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    strictPopulate: false
  }
);

// add plugin that converts mongoose to json
CarSchema.plugin(toJSON);
CarSchema.plugin(paginate);

/**
 * @typedef Car
 */
const Car = mongoose.model("Car", CarSchema);

module.exports = Car;
