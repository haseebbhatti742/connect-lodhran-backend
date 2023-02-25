const express = require("express");
const validate = require("../../middlewares/validate");
const authValidation = require("./auth.validation");
const authController = require("./auth.controller");

const router = express.Router();

router.post("/login", validate(authValidation.login), authController.login);

module.exports = router;
