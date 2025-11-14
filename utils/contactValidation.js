const { body, validationResult } = require("express-validator");

exports.validateContactForm = [
  // Name
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("Name can contain only letters"),

  // Email
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Enter a valid email"),

  // Phone (optional)
  body("phone")
    .optional()
    .trim()
    .isMobilePhone()
    .withMessage("Enter a valid phone number"),

  // Message
  body("message")
    .trim()
    .notEmpty()
    .withMessage("Message is required")
    .isLength({ min: 5 })
    .withMessage("Message must be at least 5 chars"),

  // Final error handler
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
