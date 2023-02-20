const mongoose = require("mongoose");
const CarModel = require("../car/car.model");
const { toJSON, paginate } = require("../../models/plugins");

const CategorySchema = mongoose.Schema(
  {
    //common fields
    name: {
      type: String,
      required: [true, "Name is required"],
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
    timestamps: true
  }
);

// add plugin that converts mongoose to json
CategorySchema.plugin(toJSON);
CategorySchema.plugin(paginate);

CategorySchema.pre('deleteOne', async function(next) {
  const category = this;

  // Find all the cars associated with the category
  const cars = await CarModel.find(category._id);
  if(cars.length > 0) {
    for(const car of cars) {
      await CarModel.deleteOne({_id:car.id})
    }
  }

  next();
});

/**
 * @typedef Category
 */
const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
