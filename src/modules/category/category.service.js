const httpStatus = require("http-status");
const CategoryModel = require("./category.model");
const ApiError = require("../../utils/ApiError");
let categoryService = {};

/**
 * Ceate Category
 * @param {Object} CategoryBody
 * @returns {Promise<CategoryModel>}
 */
categoryService.createCategory = async (CategoryBody) => {
  return await CategoryModel.create(CategoryBody);
};

/**
 * Get All Categorys
 * @returns {Promise<CategoryModel>}
 */
categoryService.getAllCategorys = async () => {
  return CategoryModel.find({})
};

/**
 * Get Category By Id
 * @param {ObjectId} id
 * @returns {Promise<CategoryModel>}
 */
categoryService.getCategoryById = async (id) => {
  return CategoryModel.findById(id);
};

/**
 * Update Category By Id
 * @param {ObjectId} id
 * @param {Object} updateBody
 * @returns {Promise<CategoryModel>}
 */
categoryService.updateCategoryById = async (id, updateBody) => {
  await CategoryModel.updateOne({ _id: id }, updateBody);
  return "Category Updated";
};

/**
 * Delete Category By Id
 * @param {ObjectId} id
 */
categoryService.deleteCategoryById = async (id) => {
  await CategoryModel.deleteOne({ _id: id });
  return "Category Deleted";
};

module.exports = categoryService;
