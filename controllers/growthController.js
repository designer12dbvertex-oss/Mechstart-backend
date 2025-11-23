// const sendEmail = require("../utils/growthEmail.js");

// const growthFormEmail = async (req, res) => {
//   try {
//     const { name, company, email, message } = req.body;

//     if (!name || !company || !email || !message) {
//       return res.status(400).json({
//         success: false,
//         message: "All field are  required.",
//       });
//     }

//     const emailConten = `
// New Project Inquiry
// --------------------
// Name: ${name}
// Company: ${company || "N/A"}
// email: ${email || "N/A"}
// message: ${message || "N/A"}


// --------------------
// Sent from your project form.
// `;

//     await sendEmail(
//       process.env.SMTP_RECEIVER || process.env.SMTP_USER,
//       `New Inquiry from ${name}`,
//       emailConten
//     );

//     res.status(200).json({
//       success: true,
//       message: "Submit form successfully!",
//     });
//   } catch (error) {
//     console.error("❌ Error in sendFormEmail:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to send email",
//     });
//   }
// };

// module.exports = { growthFormEmail };



import sendEmail from "../utils/growthEmail.js";

export const growthFormEmail = async (req, res) => {
  try {
    const { name, company, email, message } = req.body;

    if (!name || !company || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const messages = `
New Project Inquiry
--------------------
Name: ${name}
Company: ${company || "N/A"}
Email: ${email || "N/A"}
Message: ${message || "N/A"}

--------------------
Sent from your project form.
`;

    await sendEmail(
      process.env.SMTP_RECEIVER || process.env.SMTP_USER,
      `New Inquiry from ${name}`,
      messages // changed from `message` to `messages` so email content is correct
    );

    res.status(200).json({
      success: true,
      message: "Submit form successfully!",
    });
  } catch (error) {
    console.error("❌ Error in growthFormEmail:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send email",
    });
  }
};
