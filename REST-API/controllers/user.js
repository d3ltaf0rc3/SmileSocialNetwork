const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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

                    res.cookie("auth-token", token);
                    return res.send(userObject);
                } catch (error) {
                    if (error.code === 11000) {
                        return res.status(401).send({
                            error: "Username already taken!"
                        });
                    }
                    
                    return res.status(500).send({
                        error
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
    if (!res.cookies) {
        return res.status(422).send({
            error: "Auth cookie missing!"
        });
    }
    
    return res.clearCookie("auth-token").send({
        message: "Logout is successful!"
    });
}

module.exports = {
    register,
    login,
    logout
};