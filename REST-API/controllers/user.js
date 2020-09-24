const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { decodeCookie } = require("../utils/decode-cookie");

async function register(req, res) {
    const { username, password, repeatPassword } = req.body;

    if (password === repeatPassword) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                try {
                    const user = new User({ username, password: hash });
                    const userObject = await user.save();

                    const token = jwt.sign({
                        userID: userObject._id,
                        username: userObject.username
                    }, process.env.JWT_KEY);

                    res.cookie("auth-token", token, { expires: new Date(Date.now() + 604800000) }).send(user);
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
            userID: user._id,
            username: user.username
        }, process.env.JWT_KEY);

        return res.cookie("auth-token", token, { expires: new Date(Date.now() + 604800000) }).send(user);
    } else {
        return res.status(401).send({
            error: "Wrong username or password!"
        });
    }
}

async function logout(req, res) {
    if (!req.cookies["auth-token"]) {
        return res.status(422).send({
            error: "Auth cookie missing!"
        });
    }

    return res.clearCookie("auth-token").send({
        message: "Logout is successful!"
    });
}

async function editUser(req, res) {
    const user = req.body.user;

    try {
        await User.findByIdAndUpdate({ _id: user._id }, user);
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
            const decodedCookie = decodeCookie(req.cookies["auth-token"]);
            const currentUser = await User.findById(decodedCookie.userID);
            const result = await bcrypt.compare(oldPassword, currentUser.password);

            if (result) {
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(password, salt);

                await User.findByIdAndUpdate(decodedCookie.userID, { password: hash });
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
        return res.status(401).send({
            error: "No cookie was sent!"
        });
    }

    try {
        const decoded = decodeCookie(req.cookies["auth-token"]);
        const user = await User.findOne({ username: decoded.username })
            .populate("followers")
            .populate("following")
            .populate("requests");
        return res.send(user);
    } catch (error) {
        res.status(401).send({
            error: error.message
        });
    }
}

async function searchUsers(req, res) {
    const { query } = req.body;

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

async function followUser(req, res) {
    const userToFollow = req.params.username;

    try {
        const decoded = decodeCookie(req.cookies["auth-token"]);
        const user = await User.findOne({ username: userToFollow });
        if (user.isPrivate) {
            await User.findByIdAndUpdate(user._id, { $addToSet: { requests: decoded.userID } });
        } else {
            await User.findByIdAndUpdate(user._id, { $addToSet: { followers: decoded.userID } });
            await User.findByIdAndUpdate(decoded.userID, { $addToSet: { following: user._id } });
        }
        return res.status(204).end();
    } catch (error) {
        return res.status(500).send({
            error: error.message
        });
    }
}

async function unfollowUser(req, res) {
    const userToUnfollow = req.params.username;

    try {
        const decoded = decodeCookie(req.cookies["auth-token"]);
        const user = await User.findOne({ username: userToUnfollow });

        await User.findByIdAndUpdate(user._id, { $pull: { followers: decoded.userID } });
        await User.findByIdAndUpdate(decoded.userID, { $pull: { following: user._id } });

        return res.status(204).end();
    } catch (error) {
        return res.status(500).send({
            error: error.message
        });
    }
}

async function cancelRequest(req, res) {
    const username = req.params.username;

    try {
        const decoded = decodeCookie(req.cookies["auth-token"]);
        const user = await User.findOne({ username });
        await User.findByIdAndUpdate(user._id, { $pull: { requests: decoded.userID } });

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
        const decoded = decodeCookie(req.cookies["auth-token"]);
        const user = await User.findOne({ username: userToHandle });
        await User.findByIdAndUpdate(decoded.userID, { $pull: { requests: user._id } });

        if (action === "accept") {
            await User.findByIdAndUpdate(user._id, { $addToSet: { following: decoded.userID } });
            await User.findByIdAndUpdate(decoded.userID, { $addToSet: { followers: user._id } });
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
    followUser,
    unfollowUser,
    cancelRequest,
    handleRequest
};