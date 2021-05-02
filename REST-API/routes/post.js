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
    deletePostFromCloudinary
} = require("../controllers/post");
const router = express.Router();

router.get("/get/feed", auth, getFeed);
router.get("/get/:id", auth, getPost);
router.post('/add/post', auth, createAPost);
router.put("/action/:action/:postId", auth, handleAction);
router.put("/add/comment/:postId", auth, addComment);
router.put("/edit/:postId", auth, editPost);
router.delete("/delete/cloudinary", auth, deletePostFromCloudinary);
router.delete("/delete/:postId", auth, deletePost);

module.exports = router;