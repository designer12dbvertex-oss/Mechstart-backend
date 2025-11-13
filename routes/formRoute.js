const express = require("express");
const { sendEmail } = require("../controllers/formController");
const { sendFormEmail } = require("../controllers/formController");
const { validateForm } = require("../utils/validation.js");

const router = express.Router();

router.post("/send-email", validateForm, sendFormEmail);

module.exports = router;
