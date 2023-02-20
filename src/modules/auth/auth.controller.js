const httpStatus = require("http-status");
const { tokenService, authService } = require("../../services");
const catchAsync = require("../../utils/catchAsync");

let authController = {};

authController.signup = catchAsync(async (req, res) => {
  const user = await authService.signup(req.body.name, req.body.email);
  res.status(httpStatus.CREATED).send({ user });
});

authController.login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  user.password = null;
  res.send({ user, tokens });
});

module.exports = authController;
