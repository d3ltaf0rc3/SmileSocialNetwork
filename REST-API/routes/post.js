const express = require("express");
const auth = require("../utils/auth");
const {
    createAPost,
    getPost,
    getFeed,
    likePost,
    unlikePost,
    addComment,
    deletePost,
    editPost,
    deletePostFromCloudinary
} = require("../controllers/post");
const router = express.Router();

router.get("/get-post/:id", auth, getPost);

router.post("/get/feed", auth, getFeed);

router.post('/add-post', auth, createAPost);

router.put("/like/:postId", auth, likePost);

router.put("/unlike/:postId", auth, unlikePost);

router.put("/add-comment/:postId", auth, addComment);

router.put("/edit/:postId", auth, editPost);

router.delete("/delete/:postId", auth, deletePost);

router.delete("/delete/cloudinary/:id", auth, deletePostFromCloudinary);

module.exports = router;