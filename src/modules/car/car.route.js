const express = require("express");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const carValidation = require("./car.validation");
const carController = require("./car.controller");

const router = express.Router();

router
  .route("/")
  .post(auth(), validate(carValidation.createCar), carController.createCar)
  .get(auth(), validate(carValidation.getAllCars), carController.getAllcars);

router
  .route("/:carId")
  .get(auth(), validate(carValidation.getCarById), carController.getCarById)
  .patch(auth(), validate(carValidation.updateCar), carController.updateCarById)
  .delete(
    auth(),
    validate(carValidation.getCarById),
    carController.deleteCarById
  );

module.exports = router;
