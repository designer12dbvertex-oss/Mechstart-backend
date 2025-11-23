// const nodemailer = require("nodemailer");
// require("dotenv").config();

// async function contactEmail(to, subject, message) {
//   try {
//     // Use Gmail's SMTP for real sending

//     const transporter = nodemailer.createTransport({
//       service: "gmail",

//       auth: {
//         user: process.env.SMTP_USER,

//         pass: process.env.SMTP_PASS,
//       },
//     });

//     const info = await transporter.sendMail({
//       from: `"Refund Team" <${process.env.SMTP_USER}>`,

//       to,

//       subject,

//       text: message,
//     });

//     console.log("✅ Email sent:", info.messageId);
//   } catch (error) {
//     console.error("❌ Error sending email:", error.message);
//   }
// }

// module.exports = contactEmail;



import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

async function contactEmail(to, subject, message) {
  try {
    // Use Gmail's SMTP for real sending
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
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

export default contactEmail;