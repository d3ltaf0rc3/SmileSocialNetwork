const jwt = require("jsonwebtoken");

module.exports = (cookie) => {
    try {
        return jwt.verify(cookie, process.env.JWT_KEY);
    } catch (error) {
        throw new Error("Invalid cookie!");
    }
};