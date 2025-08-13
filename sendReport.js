const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');
require("dotenv").config();

const htmlSummary = fs.readFileSync(path.join(__dirname, 'reporters', 'custom-report.html'), 'utf-8');

const allureReportLink = [process.env.REPO_LINK];

const htmlEmailBody = `
  ${htmlSummary}
  <br><br>
  <p>📊 <strong>Full Allure Report:</strong> <a href="${allureReportLink}">View allure report</a></p>
`;
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: [process.env.FROM],
    pass: [process.env.PASSCODE]
  }
});
const mailOptions = {
  from: [process.env.FROM],
  to: [process.env.TO],
  subject: 'Playwright Test Execution Report',
   html: htmlEmailBody,
};
transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.error('Email sending failed:', error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
 