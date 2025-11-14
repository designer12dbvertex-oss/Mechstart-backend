const express = require("express");
// const { sendEmail } = require("../controllers/projectinquiryController");
const { sendFormEmail } = require("../controllers/projectInquiryController");
const { validateForm } = require("../utils/validation.js");

const router = express.Router();

router.post("/send-email", validateForm, sendFormEmail);

module.exports = router;
