const CarModel = require("./car.model");
let carService = {};

/**
 * Ceate car
 * @param {Object} carBody
 * @returns {Promise<CarModel>}
 */
carService.createCar = async (carBody) => {
  return await CarModel.create(carBody);
};

/**
 * Get All cars
 * @returns {Promise<CarModel>}
 */
carService.getAllCars = async () => {
  return await CarModel.find({}).populate('category');
};

/**
 * Get car By Id
 * @param {ObjectId} id
 * @returns {Promise<CarModel>}
 */
carService.getCarById = async (id) => {
  return await CarModel.findById(id).populate("category");
};

/**
 * Get car By Id
 * @param {string} registrationNumber
 * @returns {Promise<CarModel>}
 */
carService.getCarByRegistrationNumber = async (registrationNumber) => {
  return await CarModel.findOne({registrationNumber})
};

/**
 * Update car By Id
 * @param {ObjectId} id
 * @param {Object} updateBody
 * @returns {Promise<CarModel>}
 */
carService.updateCarById = async (id, updateBody) => {
  await CarModel.updateOne({ _id: id }, updateBody);
  return "Car Updated";
};

/**
 * Delete car By Id
 * @param {ObjectId} id
 */
carService.deleteCarById = async (id) => {
  await CarModel.deleteOne({ _id: id });
  return "Car Deleted";
};

module.exports = carService;
