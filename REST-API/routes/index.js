const express = require("express");
const { register, login, logout, editUser, changePassword, getUser } = require("../controllers/user");
const auth = require("../utils/auth");
const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.get('/logout', auth(), logout);

router.put("/edit", auth(), editUser);

router.put("/change-password", auth(), changePassword);

router.get("/user/:username", getUser);

module.exports = router;