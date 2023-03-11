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
  return `<!DOCTYPE html><html><body><div style="display:flex; flex-direction:column; align-items:center; justify-content:'center'; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif">
  <div style="width:100%; height:80px; margin: 10px 10px 0px 10px; display:flex; align-items:center; justify-content: space-between">
    <img src="../assets/logo1.png" alt="Logo" style="width:50px; height:40px; margin-left:20px"/>
     <h2 style="margin-right: 20px">New Package</h2>
  </div>
  <div  style="width:100%; height:1px; background-color:gray"></div>
  <div style="width:100%; height:auto; margin: 20px 40px 20px 40px;">
    <p style="margin: 20px 20px 20px 20px; font-size:20px; line-height:25px">Dear ${name}, Your User ID ${userid} VLAN-${vlan} Will Expire On ${date}. For Next Recharge Call 03005592282 (Whatsapp-only)</p>
  </div>
  <div  style="width:100%; height:1px; background-color:gray"></div>
  <div style="margin-top:10px; width:100%; height:autopx; display:flex; flex-direction:column; align-items:center; justify-content:center">
    <img src="../assets/logo1.png" 	alt="Logo" style="width:70px; height:50px"/>
     <h4>Copyright &copy; 2023 Connect Communications Lodhran</h4>
     <a href="https://www.connectcommunicationsLodhran.com" target="blank">ConnectCommunicationsLodhran.Com</a>
  </div>
 </div></body></html>`;
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
