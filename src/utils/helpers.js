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

const getEmailFormatForPackageExpiry = (name, userid, vlan, date) => {
  return `<!DOCTYPE html>
  <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="x-apple-disable-message-reformatting">
    <title></title>
    <style>
      table, td, div, h1, p {font-family: Arial, sans-serif;}
    </style>
  </head>
  <body style="margin:0;padding:0;">
    <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;background:#ffffff;">
      <tr>
        <td align="center" style="padding:0;">
          <table role="presentation" style="width:602px;border-collapse:collapse;border:1px solid #cccccc;border-spacing:0;text-align:left;">
            <tr>
              <td align="center" style="padding:40px 0 30px 0;background:#70bbd9;">
                <img src="https://www.connect.net.pk/images/logo/connect-logo-original.png" alt="" width="300" style="height:auto;display:block;" />
              </td>
            </tr>
            <tr>
              <td style="padding:36px 30px 42px 30px;">
                <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;">
                  <tr>
                    <td style="padding:0 0 36px 0;color:#153643;">
                      <h1 style="font-size:24px;margin:0 0 20px 0;font-family:Arial,sans-serif;">Package Expiry</h1>
                      <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;">Dear ${name}, Your User ID <span style="font-weight:bold">${userid}</span> VLAN-${vlan} Will Expire On ${date}. For Next Recharge Call 03005592282 (Whatsapp-only).</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:30px;background:#ee4c50;">
                <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;font-size:9px;font-family:Arial,sans-serif;">
                  <tr>
                    <td style="padding:0;width:50%;" align="left">
                      <p style="margin:0;font-size:14px;line-height:16px;font-family:Arial,sans-serif;color:#ffffff;">
                        &copy; Connect Communication Lodrhan ${new Date().getFullYear()}<br/><a href="https://www.connectcommunicationsLodhran.com" target="blank" style="color:#ffffff;text-decoration:underline;">Visit Our Website</a>
                      </p>
                    </td>
                    <td style="padding:0;width:50%;" align="right">
                      <table role="presentation" style="border-collapse:collapse;border:0;border-spacing:0;">
                        <tr>
                          <td style="padding:0 0 0 10px;width:38px;">
                            <a href="http://www.twitter.com/" style="color:#ffffff;"><img src="https://www.connect.net.pk/images/logo/connect-logo-original.png" alt="Twitter" width="200" height="50" style="height:auto;display:block;border:0;" /></a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>`;
};

const getTomorrowDate = () => {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const year = tomorrow.getFullYear();
  const month = tomorrow.getMonth() + 1;
  const day = tomorrow.getDate();
  const tomorrowDate = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;

  return tomorrowDate;
};

module.exports = {
  generatePassword,
  getPaymentMethodNameByKey,
  getEmailFormatForPackageExpiry,
  getTomorrowDate,
};
