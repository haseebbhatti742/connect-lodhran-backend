const sgMail = require("@sendgrid/mail");
const nodemailer = require("nodemailer");
sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

const transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true, // set this to false if your SMTP server does not support SSL/TLS
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

const sendEmail = (to, subject, text) => {
  const message = {
    from: process.env.SMTP_USER,
    to,
    subject,
    text,
  };

  transport.sendMail(message, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

const sendNewPasswordEmail = async (to, password) => {
  const subject = "New Password";
  const text = `Dear user,
    Thanks for joining us, Your new password is: '${password}'
    If you did not request any registration, then ignore this email.`;
  await sgMail.send({
    to,
    from: process.env.SEND_GRID_FROM_EMAIL,
    subject,
    text,
  });
};

module.exports = {
  sendNewPasswordEmail,
  sendEmail,
};
