const express = require("express");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const ispValidation = require("./isp.validation");
const ispController = require("./isp.controller");

const router = express.Router();

router
  .route("/")
  .post(auth(), validate(ispValidation.createIsp), ispController.createIsp)
  .get(auth(), validate(ispValidation.getAllIsps), ispController.getAllisps);

router
  .route("/:id")
  .get(auth(), validate(ispValidation.getIspById), ispController.getIspById)
  .patch(auth(), validate(ispValidation.updateIsp), ispController.updateIspById)
  .delete(
    auth(),
    validate(ispValidation.getIspById),
    ispController.deleteIspById
  );

module.exports = router;
