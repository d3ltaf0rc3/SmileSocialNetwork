const { body } = require("express-validator");

module.exports = [
  body("resource", "Resource is invalid!")
    .trim()
    .not()
    .isEmpty()
    .custom((value) => {
      if (
        value.startsWith(`https://res.cloudinary.com/${process.env.CLOUD_NAME}/video/upload`) ||
        value.startsWith(`https://res.cloudinary.com/${process.env.CLOUD_NAME}/image/upload`)
      ) {
        return true;
      }
      throw new Error("Resource URL doesn't match the required URL pattern!");
    }),
  body("public_id", "Public ID is required!")
    .trim()
    .not()
    .isEmpty()
    .custom((value, { req }) => {
      const urlId = req.body.resource.match(/(?<=\/)[\w]+(?=\.[a-z0-9]+$)/)[0];

      if (urlId === value) {
        return true;
      }
      throw new Error("Public ID doesn't match the required pattern!")
    }),
];