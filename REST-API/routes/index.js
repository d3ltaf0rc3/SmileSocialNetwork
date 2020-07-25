const express = require("express");
const { register, login, logout, editUser, changePassword, getUser } = require("../controllers/user");
const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.post('/logout', logout);

router.put("/edit", editUser);

router.put("/change-password", changePassword);

router.get("/user/:username", getUser);

module.exports = router;