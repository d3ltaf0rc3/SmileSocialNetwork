const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const sanitizeString = require("../utils/sanitizeString");
const cookieOptions = require("../config/cookie-options");
const { isUsernameValid, arePasswordsValid } = require("../validators/user");
const deleteSensitiveData = require("../utils/deleteSensitiveData");

async function register(req, res) {
    const { username, password, repeatPassword } = req.body;

    try {
        isUsernameValid(username);
        arePasswordsValid(password, repeatPassword);

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const user = new User({ username, password: hash });
        await user.save();

        const token = jwt.sign(user._id.toString(), process.env.JWT_KEY);

        const userToSend = deleteSensitiveData(user);
        return res.cookie("auth-token", token, cookieOptions).send(userToSend);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).send("Username already taken!");
        }
        return res.status(500).send(error.message);
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
        return res.status(401).send("Wrong username or password!");
    }

    const status = await bcrypt.compare(password, user.password);

    if (status) {
        const token = jwt.sign(user.id, process.env.JWT_KEY);

        const userToSend = deleteSensitiveData(user);
        return res.cookie("auth-token", token, cookieOptions).send(userToSend);
    } else {
        return res.status(401).send("Wrong username or password!");
    }
}

async function logout(req, res) {
    return res.clearCookie("auth-token", cookieOptions).send("Logout is successful!");
}

async function editUser(req, res) {
    try {
        const editedUser = await User.findByIdAndUpdate(req.userId, { ...req.body }, { new: true });

        const userToSend = deleteSensitiveData(editedUser);
        return res.send(userToSend);
    } catch (error) {
        return res.status(500).send(error.message);
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
            return res.status(404).send("User not found!");
        }

        const userToSend = deleteSensitiveData(user);
        return res.send(userToSend);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

async function changePassword(req, res) {
    const { oldPassword, password, repeatPassword } = req.body;

    try {
        arePasswordsValid(password, repeatPassword);

        const user = await User.findById(req.userId);
        const result = await bcrypt.compare(oldPassword, user.password);

        if (result) {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);

            await User.findByIdAndUpdate(req.userId, { password: hash });
            return res.clearCookie("auth-token").send("Password successfully changed!");
        } else {
            return res.status(401).send("Wrong current password!");
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

async function verifyLoggedIn(req, res) {
    if (!req.cookies["auth-token"]) {
        return res.status(401).send("Missing auth cookie");
    }

    try {
        const id = jwt.verify(req.cookies["auth-token"], process.env.JWT_KEY);
        const user = await User.findById(id)
            .populate("followers")
            .populate("following")
            .populate("requests");

        const userToSend = deleteSensitiveData(user);
        return res.send(userToSend);
    } catch (error) {
        res.status(500).clearCookie("auth-token", cookieOptions).send(error.message);
    }
}

async function searchUsers(req, res) {
    const query = sanitizeString(req.body.query);

    if (query === "") {
        return res.status(404).send("No users matching your criteria were found");
    }

    try {
        const users = await User.find({ "username": { "$regex": `${query}`, "$options": "i" } }).select("username profilePicture");

        if (users === null) {
            return res.status(404).send("No users matching your criteria were found");
        }
        return res.send(users);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

async function handleAction(req, res) {
    const id = req.params.id;
    const action = req.params.action;

    try {
        const user = await User.findById(id);

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
        }

        return res.status(204).send();
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

async function cancelRequest(req, res) {
    const id = req.params.id;

    try {
        await User.findByIdAndUpdate(id, { $pull: { requests: req.userId } });
        return res.status(204).end();
    } catch (error) {
        return res.status(500).send(error.message);
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
        return res.status(204).end();
    } catch (error) {
        return res.status(500).send(error.message);
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