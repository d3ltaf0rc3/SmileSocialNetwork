const { body } = require("express-validator");

module.exports = [
    body("password", "Password is invalid!")
        .trim().not().isEmpty()
        .isLength({ min: 8, max: 18 }).withMessage("Password must be between 8 and 18 characters!"),
    body("repeatPassword").custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Both passwords must match!");
        }
        return true;
    }),
];