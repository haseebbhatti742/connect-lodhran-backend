const httpStatus = require("http-status");
const { tokenService, authService } = require("../../services");
const catchAsync = require("../../utils/catchAsync");

let authController = {};

authController.login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginStaffWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  user.password = null;
  res.send({ user, tokens });
});

module.exports = authController;
