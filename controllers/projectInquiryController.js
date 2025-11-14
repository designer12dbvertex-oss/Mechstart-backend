// const nodemailer = require("nodemailer")
// require('dotenv').config()

// const sendEmail = async (req, res) => {

//     try {
//         const { name, company, datetime, timezone, description } = req.body;

//         if (!name || !description) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Name and description are required fields.",
//             });
//         }
//         let transporter = nodemailer.createTransport({
//             host: process.env.EMAIL_HOST,
//             port: process.env.EMAIL_PORT,
//             secure: true, // true for port 465, false for 587
//             auth: {
//                 user: process.env.EMAIL_USER,
//                 pass: process.env.EMAIL_PASS,
//             },
//         });

//         const htmlContent = `
//       <h2>📩 New Project Inquiry</h2>
//       <p><b>Name:</b> ${name}</p>
//       <p><b>Company:</b> ${company || "N/A"}</p>
//       <p><b>Date & Time:</b> ${datetime || "N/A"}</p>
//       <p><b>Timezone:</b> ${timezone || "N/A"}</p>
//       <p><b>Description:</b><br>${description}</p>
//       <hr>
//       <p style="font-size:12px;color:#777;">Sent automatically from your project form.</p>
//     `;
//         const mailOptions = {
//             from: `"Project Form" <${process.env.EMAIL_USER}>`,
//             to: process.env.EMAIL_RECEIVER || process.env.EMAIL_USER,
//             subject: `New Inquiry from ${name}`,
//             html: htmlContent,
//         };

//         const info = await transporter.sendMail(mailOptions);
//         console.log("✅ Email sent:", info.messageId);
//         console.log("✅ formController loaded successfully");

//         return res.status(200).
//             json({
//                 success: true,
//                 message: "Email sent successfully"
//             })

//     } catch (error) {
//         console.error("❌ Error sending email:", error);
//         return res
//             .status(500)
//             .json({ success: false, message: "Failed to send email. Please try again later." });
//     }
// }

// module.exports = { sendEmail };

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

const sendEmail = require("../utils/projectInquiryEmail");

const sendFormEmail = async (req, res) => {
  try {
    const { name, company, datetime, timezone, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "Name and description are required.",
      });
    }

    const message = `
New Project Inquiry
--------------------
Name: ${name}
Company: ${company || "N/A"}
Date & Time: ${datetime || "N/A"}
Timezone: ${timezone || "N/A"}

Description:
${description}
--------------------
Sent from your project form.
`;

    await sendEmail(
      process.env.SMTP_RECEIVER || process.env.SMTP_USER,
      `New Inquiry from ${name}`,
      message
    );

    res.status(200).json({
      success: true,
      message: "Submit form successfully!",
    });
  } catch (error) {
    console.error("❌ Error in sendFormEmail:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send email",
    });
  }
};

module.exports = { sendFormEmail };
