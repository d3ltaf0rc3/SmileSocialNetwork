const express = require("express");
const { createAPost, getPost, getFeed, likePost, unlikePost } = require("../controllers/post");
const router = express.Router();

router.get("/get-post/:id", getPost);

router.post("/get/feed", getFeed);

router.post('/add-post', createAPost);

router.put("/like/:postId", likePost);

router.put("/unlike/:postId", unlikePost);

module.exports = router;