const express = require("express");
const auth = require("../utils/auth");
const {
  createAPost,
  getPost,
  getFeed,
  handleAction,
  deletePost,
  editPost,
  getUserPosts,
} = require("../controllers/post");
const createPostValidation = require("../validators/post/create");
const editPostValidation = require("../validators/post/edit");
const cloudinaryValidation = require("../validators/cloudinary");
const router = express.Router();

router.get("/feed", auth, getFeed);
router.get("/get/:id", auth, getPost);
router.get("/user/:username", auth, getUserPosts);
router.post("/create", auth, createPostValidation, cloudinaryValidation, createAPost);
router.put("/action/:action/:postId", auth, handleAction);
router.put("/edit/:postId", auth, editPostValidation, editPost);
router.delete("/delete/:postId", auth, deletePost);

module.exports = router;
