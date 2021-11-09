const { body } = require("express-validator");

module.exports = [
  body("oldPassword", "Current password is not in valid format!")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Current password cannot be empty!")
    .isLength({ min: 8, max: 18 })
    .withMessage("Current password must be between 8 and 18 characters!")
    .custom((value, { req }) => {
      if (value === req.body.password) {
        throw new Error("Your new password cannot be the same as your old password!");
      }
      return true;
    }),
];
