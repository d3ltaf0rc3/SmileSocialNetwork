const express = require("express");
const {
  editUser,
  changePassword,
  getUser,
  handleAction,
  handleRequest,
  register,
  login,
  logout,
  verifyLoggedIn,
  searchUsers,
  getUserPosts,
  getRequests,
} = require("../controllers/user");
const verifyReCaptcha = require("../utils/verifyReCaptcha");
const auth = require("../utils/auth");
const usernameValidator = require("../validators/username");
const passwordValidator = require("../validators/password");
const editUserValidator = require("../validators/editUser");
const changePasswordValidator = require("../validators/changePassword");
const router = express.Router();

router.get("/get/requests", auth, getRequests);
router.get("/get/:username", auth, getUser);
router.get("/get/posts/:username", auth, getUserPosts);
router.get("/logout", auth, logout);
router.get("/verify/session", verifyLoggedIn);
router.put("/edit", auth, editUserValidator, editUser);
router.put("/change-password", auth, changePasswordValidator, passwordValidator, changePassword);
router.put("/action/:action/:id", auth, handleAction);
router.put("/handle-request", auth, handleRequest);
router.post("/register", usernameValidator, passwordValidator, register);
router.post("/login", login);
router.post("/verify/reCaptcha", verifyReCaptcha);
router.post("/search", auth, searchUsers);

module.exports = router;
