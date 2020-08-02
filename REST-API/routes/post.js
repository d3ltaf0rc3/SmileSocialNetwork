const express = require("express");
const { createAPost, getPost } = require("../controllers/post");
const router = express.Router();

router.post('/add-post', createAPost);

router.get("/get-post/:id", getPost);


module.exports = router;