const httpStatus = require("http-status");
const ApiError = require("../../utils/ApiError");
const catchAsync = require("../../utils/catchAsync");
const { invoiceService, ispService } = require("../../services");
let invoiceController = {};

invoiceController.createInvoice = catchAsync(async (req, res) => {
  const isIsp = await ispService.getIspById(req.body.isp);
  if (!isIsp) throw new ApiError(httpStatus.NOT_FOUND, "Isp Not Found");
  else {
    const invoice = await invoiceService.createInvoice(req.body);
    await ispService.updateIspById(isIsp?.id, {
      openingBalance: isIsp?.openingBalance - req?.body?.amount,
    });
    res.status(httpStatus.CREATED).send(invoice);
  }
});

invoiceController.getAllInvoices = catchAsync(async (req, res) => {
  const invoices = await invoiceService.getAllInvoices();
  if (!invoices || invoices.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, "No Completed Invoices");
  }
  res.send({
    invoices,
    total: invoices.reduce((acc, item) => (acc += +item?.amount), 0),
  });
});

invoiceController.getInvoiceById = catchAsync(async (req, res) => {
  const invoice = await invoiceService.getInvoiceById(req.params.id);
  if (!invoice) {
    throw new ApiError(httpStatus.NOT_FOUND, "Invoice not found");
  }
  res.send(invoice);
});

invoiceController.updateInvoiceById = catchAsync(async (req, res) => {
  const invoice = await invoiceService.getInvoiceById(req?.params?.id);
  if (!invoice) throw new ApiError(httpStatus.NOT_FOUND, "Invoice Not Found");
  else {
    const Invoice = await invoiceService.updateInvoiceById(
      req?.params?.id,
      req?.body
    );
    res.send(Invoice);
  }
});

// invoiceController.deleteInvoiceById = catchAsync(async (req, res) => {
//   const invoice = await invoiceService.getInvoiceById(
//     req?.params?.id
//   );
//   if (!invoice) throw new ApiError(httpStatus.NOT_FOUND, "Invoice Not Found");
//   else {
//     const Invoice = await invoiceService.deleteInvoiceById(
//       req?.params?.id
//     );
//     res.send(Invoice);
//   }
// });

module.exports = invoiceController;
