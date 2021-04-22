const express = require("express");
const {
    editUser,
    changePassword,
    getUser,
    handleAction,
    cancelRequest,
    handleRequest,
    register,
    login,
    logout,
    verifyLoggedIn,
    searchUsers
} = require("../controllers/user");
const verifyReCaptcha = require("../utils/verifyReCaptcha");
const auth = require("../utils/auth");
const router = express.Router();

router.get("/get/:username", auth, getUser);
router.get('/logout', auth, logout);
router.get("/verify/cookie", verifyLoggedIn);
router.put("/edit", auth, editUser);
router.put("/change-password", auth, changePassword);
router.put("/cancel-request/:id", auth, cancelRequest);
router.post("/action/:action/:id", auth, handleAction);
router.post("/handle-request", auth, handleRequest);
router.post('/register', register);
router.post('/login', login);
router.post("/verify/reCaptcha", verifyReCaptcha);
router.post("/search", auth, searchUsers);

module.exports = router;