const express = require("express");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const staffValidation = require("./staff.validation");
const staffController = require("./staff.controller");

const router = express.Router();

router
  .route("/")
  .post(
    auth(),
    validate(staffValidation.createStaff),
    staffController.createStaff
  )
  .get(
    auth(),
    validate(staffValidation.getAllStaff),
    staffController.getAllStaffs
  );

router
  .route("/:id")
  .get(
    auth(),
    validate(staffValidation.getStaffById),
    staffController.getStaff
  );

module.exports = router;
