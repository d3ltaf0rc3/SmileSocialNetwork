const { body } = require("express-validator");

module.exports = [
  body("location", "Location is invalid!")
    .trim()
    .isLength({ max: "30" })
    .withMessage("Location cannot be more than 30 characters!")
    .escape(),
  body("description", "Description is invalid!")
    .trim()
    .isLength({ max: "150" })
    .withMessage("Description cannot be more than 150 characters!")
    .escape(),
];
