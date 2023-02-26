const httpStatus = require("http-status");
const StaffModel = require("./staff.model");
const ApiError = require("../../utils/ApiError");
let staffService = {};

/**
 * Ceate Staff
 * @param {Object} StaffBody
 * @returns {Promise<StaffModel>}
 */
staffService.createStaff = async (StaffBody) => {
  const isStaff = await StaffModel.findOne({ email: StaffBody.email });
  console.log(isStaff)
  if (isStaff && isStaff.mobile === StaffBody.mobile) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Staff already exists with email/mobile"
    );
  } else {
    return StaffModel.create(StaffBody);
  }
};

/**
 * Get Staff buy email
 * @param {string} email
 * @returns {Promise<StaffModel>}
 */
staffService.getStaffByEmail = async (email) => {
  return StaffModel.findOne({ email: email });
};

/**
 * Get All Staffs
 * @returns {Promise<StaffModel>}
 */
staffService.getAllStaffs = async () => {
  return StaffModel.find({ type: { $ne: "superadmin" } });
};

/**
 * Get Staff By Id
 * @param {ObjectId} id
 * @returns {Promise<StaffModel>}
 */
staffService.getStaffById = async (id) => {
  return StaffModel.findById(id);
};

module.exports = staffService;
