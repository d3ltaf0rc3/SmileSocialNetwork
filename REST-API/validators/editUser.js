const { body } = require("express-validator");

module.exports = [
  body("name", "Name is invalid!")
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .isLength({ max: 18 })
    .withMessage("Name cannot be more than 18 characters!")
    .matches(/^[\w\s.]+$/)
    .withMessage("Name can only container letters, digits, spaces, dots and underscores!"),
  body("description", "Bio is invalid!")
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .isLength({ max: 150 })
    .withMessage("Bio cannot be more than 150 characters!"),
  body("isPrivate", "Private field is invalid!")
    .optional({ nullable: true, checkFalsy: true })
    .isBoolean()
    .withMessage("Private field must be either true or false!"),
  body("profilePicture", "Profile picture URL is invalid!")
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .custom((value) => {
      if (value.startsWith(`https://res.cloudinary.com/${process.env.CLOUD_NAME}/image/upload`)) {
        return true;
      }
      throw new Error("Resource URL doesn't match the required URL pattern!");
    })
    .custom((value) => {
      if (
        value.endsWith(".avif") ||
        value.endsWith(".jpeg") ||
        value.endsWith(".jpg") ||
        value.endsWith(".png") ||
        value.endsWith(".svg") ||
        value.endsWith(".webp")
      ) {
        return true;
      }
      throw new Error("Unsupported file format");
    }),
  body("public_id", "Public ID is invalid!").optional({ nullable: true, checkFalsy: true }).trim(),
];
