const httpStatus = require("http-status");
const StaffModel = require("./staff.model");
const ApiError = require("../../utils/ApiError");
const { STAFF_TYPES } = require("../../utils/Constants");
let staffService = {};

/**
 * Ceate Staff
 * @param {Object} StaffBody
 * @returns {Promise<StaffModel>}
 */
staffService.createStaff = async (StaffBody) => {
  const isStaff = await StaffModel.findOne({ email: StaffBody.email });
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
 * Get All Staffs
 * @param {String} type
 * @returns {Promise<StaffModel>}
 */
staffService.getStaffsByType = async (type) => {
  return StaffModel.find({ type });
};

/**
 * Get Staff By Id
 * @param {ObjectId} id
 * @returns {Promise<StaffModel>}
 */
staffService.getStaffById = async (id) => {
  return StaffModel.findById(id);
};

/**
 * Get All Partners
 * @returns {Promise<StaffModel>}
 */
staffService.getAllPartner = async () => {
  return StaffModel.find({ type: { $in: [STAFF_TYPES.admin, STAFF_TYPES.partner] } })
};

module.exports = staffService;
