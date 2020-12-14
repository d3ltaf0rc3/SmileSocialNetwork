const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        jwt.verify(req.cookies['auth-token'], process.env.JWT_KEY);
        next();
    } catch (error) {
        return res.status(401).send({
            error: "User not authenticated!"
        });
    }
};