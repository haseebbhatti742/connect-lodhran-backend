const express = require("express");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const userValidation = require("./user.validation");
const userController = require("./user.controller");

const router = express.Router();

router
  .route("/")
  .post(auth(), validate(userValidation.createUser), userController.createUser)
  .get(
    auth(),
    validate(userValidation.getAllUsers),
    userController.getAllUsers
  );

router
  .route("/:userId")
  .get(auth(), validate(userValidation.getUser), userController.getUser);

module.exports = router;
