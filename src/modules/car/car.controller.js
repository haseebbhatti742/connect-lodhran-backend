const httpStatus = require("http-status");
const ApiError = require("../../utils/ApiError");
const catchAsync = require("../../utils/catchAsync");
const { carService } = require("../../services");
let carController = {};

carController.createCar = catchAsync(async (req, res) => {
  const isCarAlreadyRegistered = await carService.getCarByRegistrationNumber(req.body.registrationNumber)
  if(isCarAlreadyRegistered) throw new ApiError(httpStatus.NOT_FOUND, "Registration Number Taken")
  else {
    const car = await carService.createCar(req.body);
    res.status(httpStatus.CREATED).send(car);
  }
});

carController.getAllcars = catchAsync(async (req, res) => {
  const cars = await carService.getAllCars();
  if (!cars) {
    throw new ApiError(httpStatus.NOT_FOUND, "No cars");
  }
  res.send(cars);
});

carController.getCarById = catchAsync(async (req, res) => {
  const car = await carService.getCarById(req?.params?.carId);
  if (!car) {
    throw new ApiError(httpStatus.NOT_FOUND, "Car Not Found");
  }
  res.send(car);
});

carController.updateCarById = catchAsync(async (req, res) => {
  const car = await carService.getCarById(req?.params?.carId);
  if (!car) throw new ApiError(httpStatus.NOT_FOUND, "Car Not Found");
  else {
    const isCarAlreadyRegistered = await carService.getCarByRegistrationNumber(req.body.registrationNumber)
    if(isCarAlreadyRegistered && car.id !== isCarAlreadyRegistered.id) throw new ApiError(httpStatus.NOT_FOUND, "Registration Number Taken")
    const cars = await carService.updateCarById(req?.params?.carId, req?.body);
    res.send(cars);
  }
});

carController.deleteCarById = catchAsync(async (req, res) => {
  const car = await carService.getCarById(req?.params?.carId);
  if (!car) throw new ApiError(httpStatus.NOT_FOUND, "Car Not Found");
  else {
    const cars = await carService.deleteCarById(req?.params?.carId);
    res.send(cars);
  }
});

module.exports = carController;
