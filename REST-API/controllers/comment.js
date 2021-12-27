const Post = require("../models/Post");
const Comment = require("../models/Comment");
const Sentry = require("@sentry/node");
const { validationResult } = require("express-validator");
const response = require("../utils/responseGenerator");

async function addComment(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send(response("fail", errors.array()[0].msg));
  }

  const postId = req.params.postId;

  try {
    const post = await Post.findById(postId);
    if (post === null) {
      return res.status(404).send(response("fail", "Post not found!"));
    }

    const comment = new Comment({
      postedBy: req.userId,
      comment: req.body.comment,
      createdAt: Date.now(),
    });
    await comment.save();
    await Post.findByIdAndUpdate(post._id, { $addToSet: { comments: comment._id } });

    const commentToSend = await Comment.findById(comment.id).populate({
      path: "postedBy",
      select: "username profilePicture"
    });
    return res.status(201).send(response("success", commentToSend));
  } catch (error) {
    Sentry.captureException(error);
    return res.status(500).send(response("fail", error.message));
  }
}

module.exports = {
  addComment,
}