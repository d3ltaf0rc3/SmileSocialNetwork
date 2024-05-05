const express = require("express");
const {
  addComment
} = require("../controllers/comment");
const auth = require("../utils/auth");
const validationErrorHandler = require("../utils/validationErrorHandler");
const commentValidation = require("../validators/comment/create");
const router = express.Router();

router.post("/add/:postId", auth, commentValidation, validationErrorHandler, addComment);

module.exports = router;
