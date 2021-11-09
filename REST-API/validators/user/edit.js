const { body } = require("express-validator");

module.exports = [
  body("name", "Name is invalid!")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 18 })
    .withMessage("Name cannot be more than 18 characters!")
    .matches(/^[\w\s.]+$/)
    .withMessage("Name can only container letters, digits, spaces, dots and underscores!")
    .escape(),
  body("description", "Bio is invalid!")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 150 })
    .withMessage("Bio cannot be more than 150 characters!")
    .escape(),
  body("isPrivate", "Private field is invalid!")
    .isBoolean()
    .withMessage("Private field must be either true or false!"),
];
