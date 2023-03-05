const { PAYMENT_METHODS } = require("./Constants");

const generatePassword = () => {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";
  for (let i = 0, n = charset.length; i < process.env.PASSWORD_LENGTH; ++i) {
    password += charset.charAt(Math.floor(Math.random() * n));
  }
  return password;
};

const getPaymentMethodNameByKey = (key) => {
  return PAYMENT_METHODS.find((item) => item.key === key).value;
};

module.exports = {
  generatePassword,
  getPaymentMethodNameByKey
};
