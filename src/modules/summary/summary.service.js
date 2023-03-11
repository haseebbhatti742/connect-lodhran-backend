const httpStatus = require("http-status");
const {
  EntryModel,
  InvoiceModel,
  ExpenseModel,
  StaffModel,
} = require("../../models");
const { ispService } = require("../../services");
const ApiError = require("../../utils/ApiError");
let summaryService = {};

summaryService.getSummaryByIsp = async (dateFrom, dateTo) => {
  const isps = await ispService.getAllIsps();
  const data = Promise.all(
    isps.map(async (isp) => {
      const totalInvoice = await getTotalInvoice(isp, dateFrom, dateTo);
      const totalInvoiceSent = await getTotalInvoiceSent(isp, dateFrom, dateTo);
      const totalEntryPending = await getTotalEntryPending(
        isp,
        dateFrom,
        dateTo
      );
      const totalBalance = totalInvoice - totalInvoiceSent;
      const totalIncome = await getTotalIncome(isp, dateFrom, dateTo);
      const totalProfit = totalIncome - totalInvoiceSent;
      return {
        isp,
        totalInvoice,
        totalInvoiceSent,
        totalBalance,
        totalEntryPending,
        totalIncome,
        totalProfit,
      };
    })
  );
  return data;
};

summaryService.getCompanyExpense = async (dateFrom, dateTo) => {
  const data = await ExpenseModel.find({
    spentBy: "company",
    date: {
      $gte: new Date(dateFrom),
      $lte: new Date(dateTo),
    },
  });
  return data.reduce((acc, item) => (acc += +item?.amount), 0);
};

summaryService.getPartnersTotalEpxense = async (dateFrom, dateTo) => {
  const data = await ExpenseModel.find({
    spentBy: { $ne: "company" },
    date: {
      $gte: new Date(dateFrom),
      $lte: new Date(dateTo),
    },
  });
  return data.reduce((acc, item) => (acc += +item?.amount), 0);
};

summaryService.getPartnersEpxenses = async (
  dateFrom,
  dateTo,
  companyProfit
) => {
  const partners = await StaffModel.find({
    type: { $in: ["partner", "superadmin"] },
  });

  const data = Promise.all(
    partners.map(async (partner) => {
      const expense = await ExpenseModel.find({
        spentBy: partner.id,
        date: {
          $gte: new Date(dateFrom),
          $lte: new Date(dateTo),
        },
      });
      const partnerExpense = expense.reduce(
        (acc, item) => (acc += +item.amount),
        0
      );
      const partnerProfit = (companyProfit * partner.share) / 100;
      return {
        partnerId: partner.id,
        fullname: partner.fullname,
        expense: partnerExpense,
        profit: partnerProfit,
        remainingProfit: partnerProfit - partnerExpense,
      };
    })
  );

  return data;
};

async function getTotalInvoice(isp, dateFrom, dateTo) {
  const data = await EntryModel.find({
    isp: isp?.id,
    entryDate: {
      $gte: new Date(dateFrom),
      $lte: new Date(dateTo),
    },
  }).populate("package");
  return data.reduce((acc, item) => (acc += +item?.package?.purchaseRate), 0);
}

async function getTotalIncome(isp, dateFrom, dateTo) {
  const data = await EntryModel.find({
    isp: isp?.id,
    paymentMethod: { $ne: "pending" },
    entryDate: {
      $gte: new Date(dateFrom),
      $lte: new Date(dateTo),
    },
  }).populate("package");
  return data.reduce((acc, item) => (acc += +item?.saleRate), 0);
}

async function getTotalEntryPending(isp, dateFrom, dateTo) {
  const data = await EntryModel.find({
    isp: isp?.id,
    paymentMethod: "pending",
    entryDate: {
      $gte: new Date(dateFrom),
      $lte: new Date(dateTo),
    },
  }).populate("package");
  return data.reduce((acc, item) => (acc += +item?.package?.saleRate), 0);
}

async function getTotalInvoiceSent(isp, dateFrom, dateTo) {
  const data = await InvoiceModel.find({
    isp: isp?.id,
    date: {
      $gte: new Date(dateFrom),
      $lte: new Date(dateTo),
    },
  });
  return data.reduce((acc, item) => (acc += +item?.amount), 0);
}

module.exports = summaryService;
