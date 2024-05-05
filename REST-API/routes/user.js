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
  searchUsers,
  getRequests,
  changeProfilePicture,
} = require("../controllers/user");
const verifyReCaptcha = require("../utils/verifyReCaptcha");
const auth = require("../utils/auth");
const usernameValidator = require("../validators/user/username");
const passwordValidator = require("../validators/user/password");
const editUserValidator = require("../validators/user/edit");
const changePasswordValidator = require("../validators/user/changePassword");
const getUserValidator = require("../validators/user/get");
const cloudinaryValidator = require("../validators/cloudinary");
const validationErrorHandler = require("../utils/validationErrorHandler");
const router = express.Router();

router.get("/requests", auth, getRequests);
router.get("/get/:username", auth, getUserValidator, validationErrorHandler, getUser);
router.get("/search", auth, searchUsers);
router.put("/edit", auth, editUserValidator, validationErrorHandler, editUser);
router.put("/edit/profile-picture", auth, cloudinaryValidator, validationErrorHandler, changeProfilePicture);
router.put("/change-password", auth, changePasswordValidator, passwordValidator, validationErrorHandler, changePassword);
router.put("/action/:action/:id", auth, handleAction);
router.put("/request/:action/:id", auth, handleRequest);
router.post("/register", usernameValidator, passwordValidator, validationErrorHandler, register);
router.post("/login", usernameValidator, validationErrorHandler, login);
router.post("/logout", auth, logout);
router.post("/verify/reCaptcha", verifyReCaptcha);

module.exports = router;
