const userRoute = require("../../modules/user/user.route");
const staffRoute = require("../../modules/staff/staff.route");
const authRoute = require("../../modules/auth/auth.route");
const packageRoute = require("../../modules/package/package.route");
const ispRoute = require("../../modules/isp/isp.route");
const entryRoute = require("../../modules/entry/entry.route");

const ROUTES = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/isp",
    route: ispRoute,
  },
  {
    path: "/user",
    route: userRoute,
  },
  {
    path: "/staff",
    route: staffRoute,
  },
  {
    path: "/package",
    route: packageRoute,
  },
  {
    path: "/entry",
    route: entryRoute,
  },
];

module.exports = ROUTES;