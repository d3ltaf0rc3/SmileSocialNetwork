const User = require("../models/User");
const TokenBlacklist = require("../models/TokenBlacklist");
const jwt = require("jsonwebtoken");

module.exports = {
    getProfile: (userID) => {
        const user = User.findById(userID)
            .populate("followers")
            .populate("following")
            .populate("posts")
            .lean();
        return user;
    },
    register: async (req, res, next) => {
        const { username, password, repeatPassword } = req.body;

        if (password === repeatPassword) {
            const newUser = await User.create({ username, password });
            return res.send(newUser);
        } else {
            return res.status(422).send("Both passwords should match!");
        }
    },

    login: (req, res, next) => {
        const { username, password } = req.body;
        User.findOne({ username })
            .then((user) => Promise.all([user, user.matchPassword(password)]))
            .then(([user, match]) => {
                if (!match) {
                    res.status(401).send('Invalid password');
                    return;
                }

                const token = jwt.sign({ id: user._id }, process.env.KEY, { expiresIn: '1h' });
                res.cookie("x-auth-token", token).send(user);
            })
            .catch(next);
    },

    logout: (req, res, next) => {
        const token = req.cookies["x-auth-token"];
        TokenBlacklist.create({ token })
            .then(() => {
                res.clearCookie("x-auth-token").send('Logout successfully!');
            })
            .catch(next);
    },

    editUser: (req, res, next) => {
        const id = req.params.id;
        const { username, password } = req.body;
        User.update({ _id: id }, { username, password })
            .then((updatedUser) => res.send(updatedUser))
            .catch(next);
    }
};