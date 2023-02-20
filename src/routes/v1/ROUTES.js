const userRoute = require("../../modules/user/user.route");
const authRoute = require("../../modules/auth/auth.route");
const categoryRoute = require("../../modules/category/category.route");
const carRoute = require("../../modules/car/car.route");

const ROUTES = [
    {
      path: "/auth",
      route: authRoute,
    },
    {
      path: "/user",
      route: userRoute,
    },
    {
      path: "/category",
      route: categoryRoute,
    },
    {
      path: "/car",
      route: carRoute,
    },
];

module.exports = ROUTES;