// import { body, validationResult } from "express-validator";

// export const validateBooking = [
//   body("userId")
//     .notEmpty()
//     .withMessage("User ID is required")
//     .isMongoId()
//     .withMessage("Invalid User ID"),

//   body("movieId")
//     .notEmpty()
//     .withMessage("Movie ID is required")
//     .isMongoId()
//     .withMessage("Invalid Movie ID"),

//   body("showtimeId")
//     .notEmpty()
//     .withMessage("Showtime ID is required")
//     .isMongoId()
//     .withMessage("Invalid Showtime ID"),

//   body("seats")
//     .isArray({ min: 1 })
//     .withMessage("At least one seat must be selected"),

//   body("seats.*").isMongoId().withMessage("Invalid Seat ID"),

//   body("totalAmount")
//     .isNumeric()
//     .withMessage("Total amount must be a number")
//     .custom((value) => value > 0)
//     .withMessage("Total amount must be greater than 0"),

//   body("customerInfo.name")
//     .trim()
//     .notEmpty()
//     .withMessage("Customer name is required")
//     .isLength({ min: 2 })
//     .withMessage("Customer name must be at least 2 characters"),

//   body("customerInfo.email").isEmail().withMessage("Valid email is required"),

//   body("customerInfo.phone")
//     .matches(/^[0-9]{10,11}$/)
//     .withMessage("Valid phone number is required"),

//   body("combos").optional().isArray().withMessage("Combos must be an array"),

//   body("combos.*.comboId")
//     .optional()
//     .isMongoId()
//     .withMessage("Invalid Combo ID"),

//   body("combos.*.quantity")
//     .optional()
//     .isInt({ min: 1 })
//     .withMessage("Combo quantity must be at least 1"),

//   (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({
//         success: false,
//         message: "Validation errors",
//         errors: errors.array(),
//       });
//     }
//     next();
//   },
// ];
