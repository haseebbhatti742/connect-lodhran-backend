const express = require("express");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const categoryValidation = require("./category.validation");
const categoryController = require("./category.controller");

const router = express.Router();

router
  .route("/")
  .post(
    auth(),
    validate(categoryValidation.createCategory),
    categoryController.createCategory
  )
  .get(
    auth(),
    validate(categoryValidation.getAllCategories),
    categoryController.getAllCategories
  );

router
  .route("/:category")
  .get(
    auth(),
    validate(categoryValidation.getCategory),
    categoryController.getCategoryById
  )
  .patch(
    auth(),
    validate(categoryValidation.updateCategory),
    categoryController.updateCategoryById
  )
  .delete(
    auth(),
    validate(categoryValidation.getCategory),
    categoryController.deleteCategoryById
  );

module.exports = router;
