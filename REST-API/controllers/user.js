const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const sanitizeString = require("../utils/sanitizeString");
const cookieOptions = require("../config/cookie-options");

async function register(req, res) {
    const { username, password, repeatPassword } = req.body;

    if (password === repeatPassword) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                try {
                    const user = new User({ username, password: hash });
                    const userObject = await user.save();

                    const token = jwt.sign({
                        userID: userObject._id
                    }, process.env.JWT_KEY);

                    return res.cookie("auth-token", token, cookieOptions).send(user);
                } catch (error) {
                    if (error.code === 11000) {
                        return res.status(409).send({
                            error: "Username already taken!"
                        });
                    }
                    return res.status(500).send({
                        error: error.message
                    });
                }
            });
        });
    } else {
        return res.status(401).send({
            error: "Both passwords should match!"
        });
    }
}

async function login(req, res) {
    const { username, password } = req.body;
    const user = await User.findOne({ username })
        .populate("followers")
        .populate("following")
        .populate("posts")
        .populate("requests");

    if (user === null) {
        return res.status(401).send({
            error: "Wrong username or password!"
        });
    }

    const status = await bcrypt.compare(password, user.password);

    if (status) {
        const token = jwt.sign({
            userID: user._id
        }, process.env.JWT_KEY);

        return res.cookie("auth-token", token, cookieOptions).send(user);
    } else {
        return res.status(401).send({
            error: "Wrong username or password!"
        });
    }
}

async function logout(req, res) {
    return res.clearCookie("auth-token", cookieOptions).send({
        message: "Logout is successful!"
    });
}

async function editUser(req, res) {
    try {
        const user = await User.findByIdAndUpdate({ _id: req.body._id }, { ...req.body }, { new: true });
        return res.send(user);
    } catch (error) {
        return res.status(500).send({
            error: error.message
        });
    }
}

async function getUser(req, res) {
    const username = req.params.username;

    try {
        const user = await User.findOne({ username })
            .populate({
                path: "posts",
                options: { sort: { createdAt: -1 } }
            })
            .populate("followers")
            .populate("following")
            .populate("requests");

        if (user === null) {
            return res.status(404).send({
                error: "User not found!"
            });
        }

        return res.send(user);
    } catch (error) {
        return res.status(500).send({
            error: error.message
        });
    }
}

async function changePassword(req, res) {
    const { oldPassword, password, repeatPassword } = req.body;

    if (password === repeatPassword) {
        try {
            const currentUser = await User.findById(req.userId);
            const result = await bcrypt.compare(oldPassword, currentUser.password);

            if (result) {
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(password, salt);

                await User.findByIdAndUpdate(req.userId, { password: hash });
                return res.clearCookie("auth-token").send({
                    message: "Password successfully changed!"
                });
            } else {
                return res.status(401).send({
                    error: "Wrong current password!"
                });
            }
        } catch (error) {
            return res.status(500).send({
                error: error.message
            });
        }
    } else {
        return res.status(401).send({
            error: "Password and repeat password don't match!"
        });
    }
}

async function verifyLoggedIn(req, res) {
    if (!req.cookies["auth-token"]) {
        return res.status(204).send();
    }

    try {
        const decoded = jwt.verify(req.cookies["auth-token"], process.env.JWT_KEY);
        const user = await User.findById(decoded.userID)
            .populate("followers")
            .populate("following")
            .populate("requests");
        return res.send(user);
    } catch (error) {
        res.status(500).send({
            error: error.message
        });
    }
}

async function searchUsers(req, res) {
    const query = sanitizeString(req.body.query);

    if (query === "") {
        return res.status(404).send({
            message: "No users matching your criteria were found"
        });
    }

    try {
        const users = await User.find({ "username": { "$regex": `${query}`, "$options": "i" } });
        if (users === null) {
            return res.status(404).send({
                message: "No users matching your criteria were found"
            });
        }
        return res.send(users);
    } catch (error) {
        return res.status(500).send({
            error: error.message
        });
    }
}

async function handleAction(req, res) {
    const username = req.params.username;
    const action = req.params.action;

    try {
        const user = await User.findOne({ username });

        if (action === "unfollow") {
            await User.findByIdAndUpdate(user._id, { $pull: { followers: req.userId } });
            await User.findByIdAndUpdate(req.userId, { $pull: { following: user._id } });
        } else if (action === "follow") {
            if (user.isPrivate) {
                await User.findByIdAndUpdate(user._id, { $addToSet: { requests: req.userId } });
            } else {
                await User.findByIdAndUpdate(user._id, { $addToSet: { followers: req.userId } });
                await User.findByIdAndUpdate(req.userId, { $addToSet: { following: user._id } });
            }
        }
        
        return res.status(204).send();
    } catch (error) {
        return res.status(500).send({
            error: error.message
        });
    }
}

async function cancelRequest(req, res) {
    const username = req.params.username;

    try {
        const user = await User.findOne({ username });
        await User.findByIdAndUpdate(user._id, { $pull: { requests: req.userId } });

        return res.status(204).end();
    } catch (error) {
        return res.status(500).send({
            error: error.message
        });
    }
}

async function handleRequest(req, res) {
    const action = req.body.action;
    const userToHandle = req.body.username;

    try {
        const user = await User.findOne({ username: userToHandle });
        await User.findByIdAndUpdate(req.userId, { $pull: { requests: user._id } });

        if (action === "accept") {
            await User.findByIdAndUpdate(user._id, { $addToSet: { following: req.userId } });
            await User.findByIdAndUpdate(req.userId, { $addToSet: { followers: user._id } });
        }
        return res.status(204).end();
    } catch (error) {
        return res.status(500).send({
            error: error.message
        });
    }
}

module.exports = {
    register,
    login,
    logout,
    editUser,
    changePassword,
    getUser,
    verifyLoggedIn,
    searchUsers,
    handleAction,
    cancelRequest,
    handleRequest
};