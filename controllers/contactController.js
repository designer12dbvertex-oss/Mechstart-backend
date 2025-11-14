const sendEmail = require("../utils/contactEmail");

const ContactFormEmail = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    const emailMessage = `
New Contact 
--------------------
Name: ${name}
Email: ${email}
Phone: ${phone || "N/A"}
Message: ${message}

--------------------
Sent from your project form.
`;

    await sendEmail(
      process.env.SMTP_RECEIVER || process.env.SMTP_USER,
      `New Contact from ${name}`,
      emailMessage
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

module.exports = { ContactFormEmail };
