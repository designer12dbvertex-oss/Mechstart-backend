import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Hum yahan 'options' object receive karenge (kyunki controller object bhej raha hai)
const sendEmail = async (options) => {
  try {
    // 1️⃣ Create transporter (GoDaddy Settings)
    const transporter = nodemailer.createTransport({
      host: "smtpout.secureserver.net", 
      port: 465,
      secure: true, // SSL ke liye true (Port 465)
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // 2️⃣ Verify SMTP connection
    await transporter.verify();
    console.log("✅ SMTP Connected OK");

    // 3️⃣ Send the email
    const info = await transporter.sendMail({
      from: `"Refund Team" <${process.env.SMTP_USER}>`, 
      // Note: Controller 'email' bhejta hai, 'to' nahi. Isliye options.email use karein
      to: options.email, 
      subject: options.subject,
      text: options.message, 
    });

    console.log("✅ Email sent successfully:", info.messageId);
    return info;

  } catch (error) {
    console.error("❌ Error sending email:", error.message || error);
    throw error;
  }
};

export default sendEmail;