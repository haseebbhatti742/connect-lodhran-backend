const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

/**
 * Send reset password email
 * @param {string} to
 * @param {string} otp
 * @returns {Promise}
 */
const sendNewPasswordEmail = async (to, password) => {
  const subject = "New Password";
  // replace this url with the link to the reset password page of your front-end app
  //const resetPasswordUrl = `${BASE_URL}/v1/auth/reset-password?token=${token}`;
  const text = `Dear user,
    Thanks for joining us, Your new password is: '${password}'
    If you did not request any registration, then ignore this email.`;
  // await sendEmail(to, subject, text);
  await sgMail.send({
    to,
    from: process.env.SEND_GRID_FROM_EMAIL,
    subject,
    text,
  });
};

module.exports = {
  sendNewPasswordEmail,
};
