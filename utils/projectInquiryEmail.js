// const nodemailer = require("nodemailer");
//  require('dotenv').config()

 
// async function sendEmail(to, subject, message) {

//   try {

//     // Use Gmail's SMTP for real sending

//     const transporter = nodemailer.createTransport({

//       service: "gmail",

//       auth: {

//         user: process.env.SMTP_USER, // your gmail address

//         pass: process.env.SMTP_PASS, // app password (not your real gmail password)

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
 
// module.exports = sendEmail;


// import nodemailer from "nodemailer";
// import dotenv from "dotenv";

// dotenv.config();

// async function sendEmail(to, subject, message) {
//   try {
//     // Use Gmail's SMTP for real sending
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.SMTP_USER, // your gmail address
//         pass: process.env.SMTP_PASS, // app password (not your real gmail password)
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


import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
 
async function sendEmail(to, subject, message) {
  try {
    // 1️⃣ Create transporter
    const transporter = nodemailer.createTransport({
      host: "smtpout.secureserver.net", // GoDaddy SMTP
      port: 465,
      secure: true, // SSL
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
 
    // 2️⃣ Optional: verify SMTP connection
    await transporter.verify();
    console.log("✅ SMTP Connected OK");
 
    // 3️⃣ Send the email
    const info = await transporter.sendMail({
      from: `"Refund Team" <${process.env.SMTP_USER}>`, // MUST match auth.user
      to,
      subject,
      text: message,
    });
 
    console.log("✅ Email sent successfully:", info.messageId);
    return info; // optional return for further processing
 
  } catch (error) {
    console.error("❌ Error sending email:", error.message || error);
    throw error; // optional: rethrow for caller
  }
}

export default sendEmail;
