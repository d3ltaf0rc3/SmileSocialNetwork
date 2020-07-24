const jwt = require('./jwt');
const User = require('../models/User');

module.exports = (redirectAuthenticated = true) => {
    return function (req, res, next) {
        const token = req.cookies[config.authCookieName] || 'auth-token';

        jwt.verifyToken(token)
            .then(data => {
                User.findById(data.id)
                    .then((user) => {
                        req.user = user;
                        next();
                    });
            })
            .catch(err => {
                if (!redirectAuthenticated) { next(); return; }

                if (['token expired', 'blacklisted token', 'jwt must be provided'].includes(err.message)) {
                    res.status(401).send('UNAUTHORIZED!');
                    return;
                }

                next(err);
            });
    };
};