const express = require("express");
const { createAPost } = require("../controllers/post");
const router = express.Router();

router.post('/add-post', createAPost);

module.exports = router;