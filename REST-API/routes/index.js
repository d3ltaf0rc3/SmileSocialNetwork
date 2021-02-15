const express = require("express");
const { register, login, logout, editUser, changePassword, getUser, verifyLoggedIn, searchUsers, followUser, unfollowUser, cancelRequest, handleRequest } = require("../controllers/user");
const verifyReCaptcha = require("../utils/verifyReCaptcha");
const auth = require("../utils/auth");
const router = express.Router();

router.get('/logout', auth, logout);
router.get("/user/:username", auth, getUser);
router.put("/edit", auth, editUser);
router.put("/change-password", auth, changePassword);
router.post('/register', register);
router.post('/login', login);
router.post("/verify", verifyLoggedIn);
router.post("/follow/:username", auth, followUser);
router.post("/unfollow/:username", auth, unfollowUser);
router.post("/cancel-request/:username", auth, cancelRequest);
router.post("/handle-request", auth, handleRequest);
router.post("/verify/reCaptcha", verifyReCaptcha);
router.post("/search", auth, searchUsers);

module.exports = router;