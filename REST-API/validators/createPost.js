const { body } = require("express-validator");

module.exports = [
    body("resource", "Resource is invalid!")
        .trim()
        .not()
        .isEmpty()
        .isURL({
            require_protocol: true,
            require_valid_protocol: true,
            protocols: ["http", "https"],
        })
        .withMessage("Resource must be a URL!")
        .custom((value) => {
            if (
                value.startsWith("https://res.cloudinary.com/smile-social-network/video/upload") ||
                value.startsWith("https://res.cloudinary.com/smile-social-network/image/upload")
            ) {
                return true;
            }
            throw new Error("Resource URL doesn't match the required URL pattern!");
        }),
    body("resource_type", "Resource type is invalid!")
        .trim()
        .custom((value) => {
            if (value === "image" || value === "video") {
                return true;
            }
            throw new Error("Invalid resource type! Must be either image or video!");
        }),
    body("location", "Location is invalid!")
        .trim()
        .isLength({ max: "30" })
        .withMessage("Location cannot be more than 30 characters!"),
    body("description", "Description is invalid!")
        .trim()
        .isLength({ max: "150" })
        .withMessage("Description cannot be more than 150 characters!"),
    body("public_id", "Public ID is required!").trim().not().isEmpty(),
];
