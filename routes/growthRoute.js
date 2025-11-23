// const express = require("express");
// // const { sendEmail } = require("../controllers/projectinquiryController");
// const { growthFormEmail } = require("../controllers/growthController");
// const { growthValidateForm } = require("../utils/growthValidation.js");

// const router = express.Router();

// router.post("/growth-email", growthValidateForm, growthFormEmail);

// module.exports = router;


import express from "express";
import { growthFormEmail } from "../controllers/growthController.js";
import { growthValidateForm } from "../utils/growthValidation.js";

const router = express.Router();

router.post("/growth-email", growthValidateForm, growthFormEmail);

export default router;
