const express = require("express");
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const cors = require("cors");
const passport = require("passport");
const httpStatus = require("http-status");
const { jwtStrategy } = require("./config/passport");
const routes = require("./routes/v1");
const { errorConverter, errorHandler } = require("./middlewares/error");
const cron = require("node-cron");
const moment = require("moment");
const ApiError = require("./utils/ApiError");
const { sendEmail } = require("./services/email.service");
const summaryController = require("./modules/summary/summary.controller");

const app = express();

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// enable cors
app.use(cors());
app.options("*", cors());

// jwt authentication
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

// v1 api routes
app.use("/api/v1", routes);
app.use("/api/v1/test", async (req, res) => {
  res.send(`Server is successfully up`);
});

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

cron.schedule("0 20 1 * * *", () => {
  summaryController.sendEmailsForTomorrowExpiry();
  sendEmail(
    "haseebbhatti742@gmail.com",
    "Connect Server Status",
    "Hi Haseeb! Just to inform you that Connect Communications Lodhran server is running peacefully. Thank you",
    true
  );
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
