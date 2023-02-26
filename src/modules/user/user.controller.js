const httpStatus = require("http-status");
const ApiError = require("../../utils/ApiError");
const catchAsync = require("../../utils/catchAsync");
const { userService } = require("../../services");
let userController = {};

userController.createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

userController.getAllUsers = catchAsync(async (req, res) => {
  const users = await userService.getAllUsers();
  if (!users || users.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, "No Users");
  }
  res.send(users);
});

userController.getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  res.send(user);
});

userController.updateUserById = catchAsync(async (req, res) => {
  const user = await userService.getUserById(
    req?.params?.id
  );
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User Not Found");
  else {
    const User = await userService.updateUserById(
      req?.params?.id,
      req?.body
    );
    res.send(User);
  }
});

userController.deleteUserById = catchAsync(async (req, res) => {
  const user = await userService.getUserById(
    req?.params?.id
  );
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User Not Found");
  else {
    const User = await userService.deleteUserById(
      req?.params?.id
    );
    res.send(User);
  }
});

module.exports = userController;
