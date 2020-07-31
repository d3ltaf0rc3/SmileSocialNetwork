const express = require("express");
const { createAPost, getPost, getPosts } = require("../controllers/post");
const router = express.Router();

router.post('/add-post', createAPost);

router.get("/get-post/:id", getPost);

router.get("/get/:username", getPosts);

module.exports = router;