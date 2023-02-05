const nodemailer = require("nodemailer");
require("dotenv").config();

const sendMail = async (mailOptions) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_SENDIN,
    port: process.env.SMTP_PORT_SENDIN,
    secure: false,
    auth: {
      user: process.env.SMTP_SENDIN_USER,
      pass: process.env.SMTP_SENDIN_PASSWORD,
    },
  });

  return transporter
    .sendMail(mailOptions)
    .then((info) => {
      console.warn(info);
    })
    .catch((err) => {
      console.warn(err);
    });
};

module.exports = sendMail;
