const { body } = require("express-validator");

module.exports = [
    body("password").custom((value, { req }) => {
        if (value === req.body.oldPassword) {
            throw new Error("Your new password cannot be the same as your old password!");
        }
        return true;
    }),
];