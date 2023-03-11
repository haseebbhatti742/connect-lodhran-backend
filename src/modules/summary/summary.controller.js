const httpStatus = require("http-status");
const ApiError = require("../../utils/ApiError");
const catchAsync = require("../../utils/catchAsync");
const { summaryService, entryService } = require("../../services");
const moment = require("moment");
const { getEmailFormatForPackageExpiry } = require("../../utils/helpers");
const { sendEmail } = require("../../services/email.service");
let summaryController = {};

summaryController.getSummary = catchAsync(async (req, res) => {
  const { month, year } = req?.body;
  if (month && year) {
    const dateFrom = new Date(year, month - 1, 1);
    const dateTo = new Date(year, month, 0);
    const data = await summaryService.getSummaryByIsp(dateFrom, dateTo);

    const totalIncome = data.reduce(
      (acc, item) => (acc += +item?.totalProfit),
      0
    );

    const companyExpense = await summaryService.getCompanyExpense(
      dateFrom,
      dateTo
    );

    const partnersExpense = await summaryService.getPartnerEpxense(
      dateFrom,
      dateTo
    );

    const companyProfit = totalIncome - companyExpense;
    const totalRemainingProfit = companyProfit - partnersExpense;

    res.send({
      data,
      totalIncome,
      companyExpense,
      companyProfit,
      partnersExpense,
      totalRemainingProfit,
    });
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid Month or Year");
  }
});

summaryController.sendEmailsForTomorrowExpiry = async () => {
  const expiredEntries = await entryService.getEntriesToExpireTomorrow();
  expiredEntries.map((item) => {
    const name = item?.user?.fullname;
    const userid = item?.user?.userId;
    const vlan = item?.entry?.isp?.vlan;
    const date = moment(item?.entry?.expiryDate).format("DD-MMM-YYYY");
    const email = item?.user?.email;
    const html = getEmailFormatForPackageExpiry(name, userid, vlan, email);
    sendEmail(email, "Package Expires Tomorrow", html);
  });
};

module.exports = summaryController;
