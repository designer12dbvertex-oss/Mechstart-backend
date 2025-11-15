const express = require("express");
// const { sendEmail } = require("../controllers/projectinquiryController");
const { growthFormEmail } = require("../controllers/growthController");
const { growthValidateForm } = require("../utils/growthValidation.js");

const router = express.Router();

router.post("/growth-email", growthValidateForm, growthFormEmail);

module.exports = router;
