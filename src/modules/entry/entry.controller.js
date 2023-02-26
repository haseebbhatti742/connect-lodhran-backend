const httpStatus = require("http-status");
const ApiError = require("../../utils/ApiError");
const catchAsync = require("../../utils/catchAsync");
const { entryService, userService } = require("../../services");
let entryController = {};

entryController.createEntry = catchAsync(async (req, res) => {
  const isUser = await userService.getUserByUserId(req.body.userId);
  if (!isUser) throw new ApiError(httpStatus.NOT_FOUND, "User Not Found")
  else {
    const entry = await entryService.createEntry(req.body);
    res.status(httpStatus.CREATED).send(entry);
  }
});

entryController.getAlCompletedlEntries = catchAsync(async (req, res) => {
  const entries = await entryService.getAlCompletedlEntries();
  if (!entries || entries.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, "No Completed Entries");
  }
  res.send(entries);
});

entryController.getAlPendinglEntries = catchAsync(async (req, res) => {
  const entries = await entryService.getAlPendinglEntries();
  if (!entries || entries.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, "No Pending Entries");
  }
  res.send(entries);
});

// entryController.getEntry = catchAsync(async (req, res) => {
//   const entry = await entryService.getEntryById(req.params.entryId);
//   if (!entry) {
//     throw new ApiError(httpStatus.NOT_FOUND, "Entry not found");
//   }
//   res.send(entry);
// });

// entryController.updateEntryById = catchAsync(async (req, res) => {
//   const entry = await entryService.getEntryById(
//     req?.params?.id
//   );
//   if (!entry) throw new ApiError(httpStatus.NOT_FOUND, "Entry Not Found");
//   else {
//     const Entry = await entryService.updateEntryById(
//       req?.params?.id,
//       req?.body
//     );
//     res.send(Entry);
//   }
// });

// entryController.deleteEntryById = catchAsync(async (req, res) => {
//   const entry = await entryService.getEntryById(
//     req?.params?.id
//   );
//   if (!entry) throw new ApiError(httpStatus.NOT_FOUND, "Entry Not Found");
//   else {
//     const Entry = await entryService.deleteEntryById(
//       req?.params?.id
//     );
//     res.send(Entry);
//   }
// });

module.exports = entryController;
