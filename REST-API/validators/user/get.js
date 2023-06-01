const { param } = require("express-validator");

module.exports = [
  param("username", "Username is invalid!")
    .isLength({ min: 2, max: 32 })
    .withMessage("Username must be between 2 and 32 characters long!")
    .matches(/^[\w.]+$/)
    .withMessage("Username can only contain english letters, numbers, underscores and dots!"),
];
