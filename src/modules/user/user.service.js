const httpStatus = require("http-status");
const UserModel = require("./user.model");
const ApiError = require("../../utils/ApiError");
let userService = {};

/**
 * Ceate User
 * @param {Object} UserBody
 * @returns {Promise<UserModel>}
 */
userService.createUser = async (UserBody) => {
  const isUser = await UserModel.find({ email: UserBody.email });
  if (isUser) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "User already exists with email"
    );
  } else {
    return UserModel.create(UserBody);
  }
};

/**
 * Get User buy email
 * @param {string} email
 * @returns {Promise<UserModel>}
 */
userService.getUserByEmail = async (email) => {
  return UserModel.findOne({ email: email });
};

/**
 * Get All Users
 * @returns {Promise<UserModel>}
 */
userService.getAllUsers = async () => {
  return UserModel.find({});
};

/**
 * Get User By Id
 * @param {ObjectId} id
 * @returns {Promise<UserModel>}
 */
userService.getUserById = async (id) => {
  return UserModel.findById(id);
};

module.exports = userService;
