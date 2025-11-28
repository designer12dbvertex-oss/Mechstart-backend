// const { body, validationResult } = require("express-validator");

// exports.validateForm = [
//   // Name: Required, only letters, min 2 chars
//   body("name")
//     .trim()
//     .notEmpty().withMessage("Name is required")
//     .isLength({ min: 2 }).withMessage("Name must be at least 2 characters long")
//     .matches(/^[A-Za-z\s]+$/).withMessage("Name must contain only letters and spaces"),

//   // Company: Required, allow letters/numbers but no symbols
//   body("company")
//     .trim()
//     .notEmpty().withMessage("Company name is required")
//     .matches(/^[A-Za-z0-9\s&.,'-]+$/).withMessage("Company name contains invalid characters"),

//   // Email: Valid format
//   body("email")
//     .trim()
//     .notEmpty().withMessage("Email is required")
//     .isEmail().withMessage("Please provide a valid email address")
//     .normalizeEmail(),

//   // Message: Required, minimum 10 characters
//   body("message")
//     .trim()
//     .notEmpty().withMessage("Message is required")
//     .isLength({ min: 10 }).withMessage("Message must be at least 10 characters long"),

//   // Middleware to handle validation errors
//   (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       // Format errors for frontend
//       const formattedErrors = errors.array().map((err) => ({
//         field: err.path,
//         message: err.msg,
//       }));

//       return res.status(400).json({
//         success: false,
//         message: "Validation failed",
//         errors: formattedErrors,
//       });
//     }
//     next();
//   },
// ];

// const { body, validationResult } = require("express-validator");

// exports.validateForm = [
//   body("name")
//     .trim()
//     .notEmpty()
//     .withMessage("Name is required")
//     .isLength({ min: 2 })
//     .withMessage("Name must be at least 2 characters long")
//     .matches(/^[A-Za-z\s]+$/)
//     .withMessage("Name must contain only letters and spaces"),

//   body("company")
//     .trim()
//     .notEmpty()
//     .withMessage("Company name is required")
//     .matches(/^[A-Za-z0-9\s&.,'-]+$/)
//     .withMessage("Company name contains invalid characters"),

//   body("description")
//     .trim()
//     .notEmpty()
//     .withMessage("Project description is required")
//     .isLength({ min: 10 })
//     .withMessage("Description must be at least 10 characters long"),

//   body("datetime").optional().isISO8601().withMessage("Invalid date format"),

//   body("timezone").optional().isString().withMessage("Timezone must be text"),

//   (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({
//         success: false,
//         message: "Validation failed",
//         errors: errors.array().map((err) => ({
//           field: err.path,
//           message: err.msg,
//         })),
//       });
//     }
//     next();
//   },
// ];

// //dddd



import { body, validationResult } from "express-validator";

export const validateForm = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters long")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("Name must contain only letters and spaces"),

  body("company")
    .trim()
    .notEmpty()
    .withMessage("Company name is required")
    .matches(/^[A-Za-z0-9\s&.,'-]+$/)
    .withMessage("Company name contains invalid characters"),



  body("description")
    .trim()
    .notEmpty()
    .withMessage("Project description is required")
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters long"),

  body("datetime")
    .optional()
    .isISO8601()
    .withMessage("Invalid date format"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail(),

  body("timezone")
    .optional()
    .isString()
    .withMessage("Timezone must be text"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array().map((err) => ({
          field: err.path,
          message: err.msg,
        })),
      });
    }
    next();
  },
];
