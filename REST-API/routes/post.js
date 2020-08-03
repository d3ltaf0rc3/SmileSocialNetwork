const express = require("express");
const { createAPost, getPost, getFeed } = require("../controllers/post");
const router = express.Router();

router.get("/get-post/:id", getPost);

router.post("/get/feed", getFeed);

router.post('/add-post', createAPost);

module.exports = router;