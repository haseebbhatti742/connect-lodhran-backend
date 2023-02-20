const UserModel = require("../user/user.model");
const { generatePassword } = require("../../utils/helpers");
const { sendNewPasswordEmail } = require("../../services/email.service");
const userService = require("../user/user.service");
const ApiError = require("../../utils/ApiError");
const httpStatus = require("http-status");
const bcrypt = require("bcryptjs");
let authService = {};

/**
 * Signup with name and email
 * @param {string} name
 * @param {string} email
 *
 */
authService.signup = async (name, email) => {
  const userExists = await userService.getUserByEmail(email);
  if (userExists)
    throw new ApiError(httpStatus.BAD_REQUEST, "User already exists");
  const password = generatePassword();
  const user = await UserModel.create({ name, email, password });
  await sendNewPasswordEmail(email, password);
  return "User created successfully. Please check your email for password.";
};

/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 */
authService.loginUserWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email);
  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "User not registered");
  } else {
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if(!isPasswordMatch) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect password");
    } else {
      return user;
    }
  }
};

module.exports = authService;
