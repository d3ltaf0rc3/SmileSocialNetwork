const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { decodeCookie } = require("../utils/decode-cookie");
const { use } = require("../routes");

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

                    res.cookie("auth-token", token, { expiresIn: '1w' }).send(user);
                } catch (error) {
                    if (error.code === 11000) {
                        return res.status(401).send({
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
    const user = await User.findOne({ username });

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
        }, process.env.JWT_KEY, { expiresIn: "1w" });

        return res.cookie("auth-token", token, { expiresIn: '1w' }).send(user);
    } else {
        return res.status(401).send({
            error: "Wrong username or password!"
        });
    }
}

async function logout(req, res) {
    if (!req.cookies) {
        return res.status(422).send({
            error: "Auth cookie missing!"
        });
    }

    return res.clearCookie("auth-token").send({
        message: "Logout is successful!"
    });
}

async function editUser(req, res) {
    try {
        const decodedCookie = decodeCookie(req.cookies["auth-token"]);
        const currentUser = await User.findById(decodedCookie.userID);

        for (const prop in currentUser) {
            if (req.body.hasOwnProperty(prop)) {
                currentUser[prop] = req.body[prop];
            }
        }

        await User.findByIdAndUpdate({ _id: decodedCookie.userID }, currentUser);
        return res.send(currentUser);
    } catch (error) {
        return res.status(500).send({
            error: error.message
        });
    }
}

async function getUser(req, res) {
    const username = req.params.username;

    try {
        const user = (await User.findOne({ username }))
            .populate("posts")
            .populate("followers")
            .populate("following");

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

                currentUser.password = hash;

                await User.findByIdAndUpdate(decodedCookie.userID, currentUser);
                return res.clearCookie("auth-token").send("Password successfully changed!");
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
        res.status(401).send({
            error: "No cookie was sent!"
        });
    }
    
    try {
        const decoded = decodeCookie(req.cookies["auth-token"]);
        const user = await User.findOne({ username: decoded.username });
        return res.send(user);
    } catch (error) {
        res.status(401).send({
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
    verifyLoggedIn
};