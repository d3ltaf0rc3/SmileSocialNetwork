const User = require("../models/User");
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const sanitizeString = require("../utils/sanitizeString");
const cookieOptions = require("../config/cookie-options");
const { deleteUserSensitiveData } = require("../utils/deleteSensitiveData");
const { validationResult } = require("express-validator");
const response = require("../utils/responseGenerator");
const emptyStringToNull = require("../utils/emptyStringToNull");

async function register(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send(response("fail", errors.array()[0].msg));
    }

    const { username, password } = req.body;

    try {
        const hash = await argon2.hash(password);

        const user = new User({ username, password: hash });
        await user.save();

        const token = jwt.sign(user._id.toString(), process.env.JWT_KEY);

        const userToSend = deleteUserSensitiveData(user);
        return res.cookie("auth-token", token, cookieOptions).send(response("success", userToSend));
    } catch (error) {
        if (error.code === 11000 || error.code === 11001) {
            return res.status(409).send(response("fail", "Username already taken!"));
        }
        return res.status(500).send(response("fail", error.message));
    }
}

async function login(req, res) {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username })
            .populate({
                path: "followers",
                select: "username profilePicture"
            })
            .populate({
                path: "following",
                select: "username profilePicture"
            });

        if (user === null) {
            return res.status(401).send(response("fail", "Wrong username or password!"));
        }

        const status = await argon2.verify(user.password, password);

        if (status) {
            const token = jwt.sign(user.id, process.env.JWT_KEY);

            const userToSend = deleteUserSensitiveData(user);
            return res.cookie("auth-token", token, cookieOptions).send(response("success", userToSend));
        } else {
            return res.status(401).send(response("fail", "Wrong username or password!"));
        }
    } catch (error) {
        return res.status(500).send(response("fail", error.message));
    }
}

async function logout(req, res) {
    return res.clearCookie("auth-token").send(response("success", "Logout is successful!"));
}

async function editUser(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send(response("fail", errors.array()[0].msg));
    }

    const body = emptyStringToNull(req);

    try {
        const user = await User.findByIdAndUpdate(req.userId, { ...body }, { new: true });

        const userToSend = deleteUserSensitiveData(user);
        return res.send(response("success", userToSend));
    } catch (error) {
        return res.status(500).send(response("fail", error.message));
    }
}

async function getUser(req, res) {
    const { username } = req.params;

    try {
        const user = await User.findOne({ username })
            .populate({
                path: "followers",
                select: "username profilePicture"
            })
            .populate({
                path: "following",
                select: "username profilePicture"
            });

        if (user === null) {
            return res.status(404).send(response("fail", "User not found!"));
        }

        let hasRequested;
        if (req.userId === user._id) {
            hasRequested = false;
        } else {
            hasRequested = user.requests.includes(req.userId);
        }

        const userToSend = deleteUserSensitiveData(user);
        return res.send(response("success", { ...userToSend, hasRequested }));
    } catch (error) {
        return res.status(500).send(response("fail", error.message));
    }
}

async function changePassword(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send(response("fail", errors.array()[0].msg));
    }

    const { oldPassword, password } = req.body;

    try {
        const user = await User.findById(req.userId);
        const result = await argon2.verify(user.password, oldPassword);

        if (result) {
            const hash = await argon2.hash(password);

            await User.findByIdAndUpdate(req.userId, { password: hash });
            return res.clearCookie("auth-token").send(response("success", "Password successfully changed!"));
        } else {
            return res.status(401).send(response("fail", "Wrong current password!"));
        }
    } catch (error) {
        return res.status(500).send(response("fail", error.message));
    }
}

async function verifyLoggedIn(req, res) {
    if (!req.cookies["auth-token"]) {
        return res.status(401).send(response("fail", "Missing auth cookie"));
    }

    try {
        const id = jwt.verify(req.cookies["auth-token"], process.env.JWT_KEY);
        const user = await User.findById(id)
            .populate({
                path: "followers",
                select: "username profilePicture"
            })
            .populate({
                path: "following",
                select: "username profilePicture"
            });

        const userToSend = deleteUserSensitiveData(user);
        return res.send(response("success", userToSend));
    } catch (error) {
        res.status(500).clearCookie("auth-token").send(response("fail", error.message));
    }
}

async function searchUsers(req, res) {
    const query = sanitizeString(req.body.query);

    if (query === "") {
        return res.status(404).send(response("fail", "No users matching your criteria were found"));
    }

    try {
        const users = await User.find({ "username": { "$regex": `${query}`, "$options": "i" } }).limit(10).select("username profilePicture");

        if (users.length === 0) {
            return res.status(404).send(response("fail", "No users matching your criteria were found"));
        }
        return res.send(response("success", users));
    } catch (error) {
        return res.status(500).send(response("fail", error.message));
    }
}

async function handleAction(req, res) {
    const id = req.params.id;
    const action = req.params.action;

    try {
        const user = await User.findById(id);

        if (user === null) {
            return res.status(404).send(response("fail", "User not found!"));
        }

        if (action === "unfollow") {
            await User.findByIdAndUpdate(id, { $pull: { followers: req.userId } });
            await User.findByIdAndUpdate(req.userId, { $pull: { following: id } });
        } else if (action === "follow") {
            if (user.isPrivate) {
                await User.findByIdAndUpdate(id, { $addToSet: { requests: req.userId } });
            } else {
                await User.findByIdAndUpdate(id, { $addToSet: { followers: req.userId } });
                await User.findByIdAndUpdate(req.userId, { $addToSet: { following: id } });
            }
        } else if (action === "cancel-request") {
            await User.findByIdAndUpdate(id, { $pull: { requests: req.userId } });
        }

        return res.send(response("success", "Action completed successfully!"));
    } catch (error) {
        return res.status(500).send(response("fail", error.message));
    }
}

async function handleRequest(req, res) {
    const action = req.body.action;
    const userToHandle = req.body.id;

    try {
        await User.findByIdAndUpdate(req.userId, { $pull: { requests: userToHandle } });

        if (action === "accept") {
            await User.findByIdAndUpdate(userToHandle, { $addToSet: { following: req.userId } });
            await User.findByIdAndUpdate(req.userId, { $addToSet: { followers: userToHandle } });
        }
        return res.send(response("success", "Request handled successfully!"));
    } catch (error) {
        return res.status(500).send(response("fail", error.message));
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
    handleRequest
};