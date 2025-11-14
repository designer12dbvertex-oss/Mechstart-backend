const express = require("express");
// const { sendEmail } = require("../controllers/projectinquiryController");
const { ContactFormEmail } = require("../controllers/contactController");
const { validateContactForm } = require("../utils/contactValidation.js");

const router = express.Router();

router.post("/contact-email", validateContactForm, ContactFormEmail);

module.exports = router;
