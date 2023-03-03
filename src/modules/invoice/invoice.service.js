const InvoiceModel = require("./invoice.model");
let invoiceService = {};

/**
 * Ceate Invoice
 * @param {Object} InvoiceBody
 * @returns {Promise<InvoiceModel>}
 */
invoiceService.createInvoice = async (InvoiceBody) => {
  return await InvoiceModel.create(InvoiceBody);
};

/**
 * Get All Completed Invoices
 * @returns {Promise<InvoiceModel>}
 */
invoiceService.getAllInvoices = async () => {
  return await InvoiceModel.find({}).populate("isp");
};

/**
 * Get Invoice by invoice by Id
 * @param {ObjectId} id
 * @returns {Promise<InvoiceModel>}
 */
invoiceService.getInvoiceById = async (id) => {
  return await InvoiceModel.findById(id).populate("isp");
};

/**
 * Update Invoice By Id
 * @param {ObjectId} id
 * @param {Object} updateBody
 * @returns {Promise<InvoiceModel>}
 */
invoiceService.updateInvoiceById = async (id, updateBody) => {
  await InvoiceModel.updateOne({ _id: id }, updateBody);
  return "Invoice Updated";
};

// /**
//  * Delete Invoice By Id
//  * @param {ObjectId} id
//  */
// invoiceService.deleteInvoiceById = async (id) => {
//   await InvoiceModel.deleteOne({ _id: id });
//   return "Invoice Deleted";
// };

module.exports = invoiceService;
