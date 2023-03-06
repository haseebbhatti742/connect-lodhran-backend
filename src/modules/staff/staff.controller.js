const httpStatus = require("http-status");
const ApiError = require("../../utils/ApiError");
const catchAsync = require("../../utils/catchAsync");
const { staffService } = require("../../services");
const { STAFF_TYPES } = require("../../utils/Constants");
let staffController = {};

staffController.createStaff = catchAsync(async (req, res) => {
  console.log(req?.body);
  const partners = await staffService.getAllPartners();
  if (req?.body.type === STAFF_TYPES.staff) {
    const staff = await staffService.createStaff(req.body);
    res.status(httpStatus.CREATED).send(staff);
  } else {
    const allPartnersShare = partners.reduce(
      (acc, partner) => (acc += +partner?.share),
      0
    );
    console.log(allPartnersShare);
    if (allPartnersShare + req?.body?.share > 100) {
      throw new ApiError(
        httpStatus.NOT_ACCEPTABLE,
        `Max share limit remaining is ${100 - allPartnersShare}`
      );
    } else {
      const staff = await staffService.createStaff(req.body);
      res.status(httpStatus.CREATED).send(staff);
    }
  }
});

staffController.getAllStaffs = catchAsync(async (req, res) => {
  const staffs = await staffService.getAllStaffs();
  if (!staffs || staffs.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, "No Staffs");
  }
  res.send(staffs);
});

staffController.getStaff = catchAsync(async (req, res) => {
  const staff = await staffService.getStaffById(req.params.id);
  if (!staff) {
    throw new ApiError(httpStatus.NOT_FOUND, "Staff not found");
  }
  res.send(staff);
});

staffController.getAllPartners = catchAsync(async (req, res) => {
  const partners = await staffService.getAllPartners();
  if (!partners || partners.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, "No partners found");
  }
  res.send(partners);
});

module.exports = staffController;
