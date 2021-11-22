const express = require("express");
const {
  addComment
} = require("../controllers/comment");
const auth = require("../utils/auth");
const commentValidation = require("../validators/comment/create");
const router = express.Router();

router.post("/add/:postId", auth, commentValidation, addComment);

module.exports = router;