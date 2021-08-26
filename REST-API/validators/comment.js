const { body } = require("express-validator");

module.exports = [
    body("comment", "Comment is invalid!")
        .trim()
        .not()
        .isEmpty()
        .isLength({ max: "150" })
        .withMessage("Comment cannot be more than 150 characters!"),
];
