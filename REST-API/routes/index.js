const express = require("express");
const { register, login, logout, editUser, changePassword, getUser, verifyLoggedIn, searchUsers } = require("../controllers/user");
const auth = require("../utils/auth");
const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.get('/logout', auth, logout);

router.put("/edit", auth, editUser);

router.put("/change-password", auth, changePassword);

router.get("/user/:username", getUser);

router.post("/verify", verifyLoggedIn);

router.get("/search/:query", searchUsers);

module.exports = router;