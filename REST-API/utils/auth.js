const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.cookies['auth-token'];

    try {
        jwt.verify(token, process.env.JWT_KEY);
        next();
    } catch (error) {
        return res.status(401).send({
            error: "User not authenticated!"
        });
    }
};