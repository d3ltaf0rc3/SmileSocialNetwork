const express = require("express");
const auth = require("../utils/auth");
const {
    createAPost,
    getPost,
    getFeed,
    handleAction,
    addComment,
    deletePost,
    editPost,
    deleteResourceFromCloudinary,
} = require("../controllers/post");
const createPostValidation = require("../validators/createPost");
const commentValidation = require("../validators/comment");
const editPostValidation = require("../validators/editPost");
const router = express.Router();

router.get("/get/feed", auth, getFeed);
router.get("/get/:id", auth, getPost);
router.post("/add", auth, createPostValidation, createAPost);
router.put("/action/:action/:postId", auth, handleAction);
router.put("/add/comment/:postId", auth, commentValidation, addComment);
router.put("/edit/:postId", auth, editPostValidation, editPost);
router.delete("/delete/cloudinary", auth, deleteResourceFromCloudinary);
router.delete("/delete/:postId", auth, deletePost);

module.exports = router;
