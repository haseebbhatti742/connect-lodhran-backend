const httpStatus = require("http-status");
const EntryModel = require("./entry.model");
const ApiError = require("../../utils/ApiError");
const { getTomorrowDate } = require("../../utils/helpers");
const { userService } = require("../../services");
let entryService = {};

/**
 * Ceate Entry
 * @param {Object} EntryBody
 * @returns {Promise<EntryModel>}
 */
entryService.createEntry = async (EntryBody) => {
  return await EntryModel.create(EntryBody);
};

/**
 * Get All Completed Entries
 * @param {String} startDate
 * @param {String} endDate
 * @param {ObjectId} EntryBody
 * @returns {Promise<EntryModel>}
 */
entryService.getAlCompletedlEntries = async (startDate, endDate, isp) => {
  return await EntryModel.find({
    isp,
    entryDate:
      endDate === "" || startDate === endDate
        ? new Date(startDate)
        : { $gte: new Date(startDate), $lte: new Date(endDate) },
  })
    .populate("isp")
    .populate("package");
};

/**
 * Get All Pending Entries
 * @returns {Promise<EntryModel>}
 */
entryService.getAlPendinglEntries = async () => {
  return await EntryModel.find({ paymentMethod: "pending" })
    .populate("isp")
    .populate("package");
};

/**
 * Get All Pending Entries
 * @returns {Promise<EntryModel>}
 */
entryService.getAlPendinglEntriesBetweenDate = async (dateFrom, dateTo) => {
  return await EntryModel.find({
    paymentMethod: "pending",
    entryDate: { $gte: new Date(dateFrom), $lte: new Date(dateTo) },
  })
    .populate("isp")
    .populate("package");
};

/**
 * Get Entry by entry by Id
 * @param {ObjectId} id
 * @returns {Promise<EntryModel>}
 */
entryService.getEntryById = async (id) => {
  return await EntryModel.findById(id).populate("isp").populate("package");
};

/**
 * Update Entry By Id
 * @param {ObjectId} id
 * @param {Object} updateBody
 * @returns {Promise<EntryModel>}
 */
entryService.updateEntryById = async (id, updateBody) => {
  await EntryModel.updateOne({ _id: id }, updateBody);
  return "Entry Updated";
};

entryService.getEntriesToExpireTomorrow = async () => {
  const entries = await EntryModel.find({
    expiryDate: new Date(getTomorrowDate()),
  })
    .populate("package")
    .populate("isp");

  const entriesToExpire = Promise.all(
    entries.map(async (item) => {
      const user = await userService.getUserByUserId(item.userId);
      return {
        entry: item,
        user,
      };
    })
  );

  return entriesToExpire;
};

// /**
//  * Delete Entry By Id
//  * @param {ObjectId} id
//  */
// entryService.deleteEntryById = async (id) => {
//   await EntryModel.deleteOne({ _id: id });
//   return "Entry Deleted";
// };

module.exports = entryService;
