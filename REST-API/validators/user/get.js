const { param } = require("express-validator");

module.exports = [
  param("username", "Username is invalid!")
    .isLength({ min: 2, max: 18 })
    .withMessage("Username must be between 2 and 18 characters long!")
    .matches(/^[\w.]+$/)
    .withMessage("Username can only contain english letters, numbers, underscores and dots!"),
];
