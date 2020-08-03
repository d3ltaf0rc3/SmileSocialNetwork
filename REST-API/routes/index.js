const express = require("express");
const {
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
    cancelRequest
} = require("../controllers/user");
const auth = require("../utils/auth");
const router = express.Router();

router.get("/search/:query", searchUsers);

router.get('/logout', auth, logout);

router.get("/user/:username", getUser);

router.put("/edit", auth, editUser);

router.put("/change-password", auth, changePassword);

router.post('/register', register);

router.post('/login', login);

router.post("/verify", verifyLoggedIn);

router.post("/follow/:username", followUser);

router.post("/unfollow/:username", unfollowUser);

router.post("/cancel-request/:username", cancelRequest);

module.exports = router;