const nodemailer = require("nodemailer");
require("dotenv").config();

const GMAIL = process.env.GMAIL;
const G_APP_PASSWORD = process.env.G_APP_PASSWORD;

// NODE-MAILER
const GMailTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: GMAIL,
    pass: G_APP_PASSWORD,
  },
});

module.exports = GMailTransport;
