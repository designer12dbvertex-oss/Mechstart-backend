const nodemailer = require("nodemailer");
 require('dotenv').config()

 
async function sendEmail(to, subject, message) {

  try {

    // Use Gmail's SMTP for real sending

    const transporter = nodemailer.createTransport({

      service: "gmail",

      auth: {

        user: process.env.SMTP_USER, // your gmail address

        pass: process.env.SMTP_PASS, // app password (not your real gmail password)

      },

    });
 
    const info = await transporter.sendMail({

      from: `"Refund Team" <${process.env.SMTP_USER}>`,

      to,

      subject,

      text: message,

    });
 
    console.log("✅ Email sent:", info.messageId);

  } catch (error) {

    console.error("❌ Error sending email:", error.message);

  }

}
 
module.exports = sendEmail;