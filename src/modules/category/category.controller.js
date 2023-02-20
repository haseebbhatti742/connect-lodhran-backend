const httpStatus = require("http-status");
const ApiError = require("../../utils/ApiError");
const catchAsync = require("../../utils/catchAsync");
const { categoryService } = require("../../services");
let categoryController = {};

categoryController.createCategory = catchAsync(async (req, res) => {
  const category = await categoryService.createCategory(req.body);
  res.status(httpStatus.CREATED).send(category);
});

categoryController.getAllCategories = catchAsync(async (req, res) => {
  const categories = await categoryService.getAllCategorys();
  if (!categories) {
    throw new ApiError(httpStatus.NOT_FOUND, "No Categories");
  }
  res.send(categories);
});

categoryController.getCategoryById = catchAsync(async (req, res) => {
  const Category = await categoryService.getCategoryById(
    req?.params?.category
  );
  if (!Category) {
    throw new ApiError(httpStatus.NOT_FOUND, "Category Not Found");
  }
  res.send(Category);
});

categoryController.updateCategoryById = catchAsync(async (req, res) => {
  const category = await categoryService.getCategoryById(
    req?.params?.category
  );
  if (!category) throw new ApiError(httpStatus.NOT_FOUND, "Category Not Found");
  else {
    const Categories = await categoryService.updateCategoryById(
      req?.params?.category,
      req?.body
    );
    res.send(Categories);
  }
});

categoryController.deleteCategoryById = catchAsync(async (req, res) => {
  const category = await categoryService.getCategoryById(
    req?.params?.category
  );
  if (!category) throw new ApiError(httpStatus.NOT_FOUND, "Category Not Found");
  else {
    const Categories = await categoryService.deleteCategoryById(
      req?.params?.category
    );
    res.send(Categories);
  }
});

module.exports = categoryController;
