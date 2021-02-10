const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const { userID } = jwt.verify(req.cookies['auth-token'], process.env.JWT_KEY);
        req.userId = userID;
        next();
    } catch (error) {
        return res.status(401).send({
            error: "User not authenticated!"
        });
    }
};