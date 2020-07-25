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

                    req.cookie("auth-token", token);
                    return res.send(userObject);
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

        return res.cookie("auth-token", token).send(user);
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

module.exports = {
    register,
    login,
    logout,
    editUser,
    changePassword
};