const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");
const Sentry = require("@sentry/node");
const cloudinary = require("cloudinary");
const { validationResult } = require("express-validator");
const response = require("../utils/responseGenerator");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

async function createAPost(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send(response("fail", errors.array()[0].msg));
  }

  const { resource, location, description, public_id, resource_type } = req.body;

  try {
    const post = new Post({
      resource,
      location,
      description,
      public_id,
      resource_type,
      postedBy: req.userId,
      createdAt: Date.now(),
    });
    await post.save();
    await User.findByIdAndUpdate(req.userId, { $addToSet: { posts: post._id } });

    return res.status(201).send(response("success", post));
  } catch (error) {
    Sentry.captureException(error);
    return res.status(500).send(response("fail", error.message));
  }
}

async function getPost(req, res) {
  const postId = req.params.id;

  try {
    const post = await Post.findById(postId)
      .populate("postedBy", "username profilePicture")
      .populate({
        path: "comments",
        populate: {
          path: "postedBy",
          select: "username profilePicture",
        },
      });

    if (post === null) {
      return res.status(404).send(response("fail", "Post not found!"));
    }

    return res.send(response("success", post));
  } catch (error) {
    Sentry.captureException(error);
    return res.status(500).send(response("fail", error.message));
  }
}

async function getFeed(req, res) {
  const posts = [];

  try {
    const { following } = await User.findById(req.userId).select("following").populate("following");

    for (const user of following) {
      for (const post of user.posts) {
        const currentPost = await Post.findById(post)
          .populate({
            path: "postedBy",
            select: "username profilePicture"
          })
          .populate({
            path: "comments",
            populate: {
              path: "postedBy",
              select: "username profilePicture"
            }
          });
        posts.push(currentPost);
      }
    }

    const sorted = posts.sort((a, b) => b.createdAt - a.createdAt).slice(0, 10);
    return res.send(response("success", sorted));
  } catch (error) {
    Sentry.captureException(error);
    return res.status(500).json(response("fail", error.message));
  }
}

async function handleAction(req, res) {
  const postId = req.params.postId;
  const action = req.params.action;

  try {
    const post = await Post.findById(postId);
    if (post === null) {
      return res.status(404).send(response("fail", "Post not found!"));
    }

    if (action === "like") {
      if (post.likes.includes(req.userId)) {
        return res.status(405).send(response("fail", "Cannot like a post you have already liked!"));
      }
      await Post.findByIdAndUpdate(postId, { $addToSet: { likes: req.userId } });
    } else if (action === "unlike") {
      if (!post.likes.includes(req.userId)) {
        return res
          .status(405)
          .send(response("fail", "Cannot unlike a post you haven't already liked!"));
      }
      await Post.findByIdAndUpdate(postId, { $pull: { likes: req.userId } });
    } else {
      return res.status(400).send(response("fail", "Unsupported action!"));
    }

    return res.send(response("success", "Action completed successfully!"));
  } catch (error) {
    Sentry.captureException(error);
    return res.status(500).send(response("fail", error.message));
  }
}

async function addComment(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send(response("fail", errors.array()[0].msg));
  }

  const postId = req.params.postId;

  try {
    const post = await Post.findById(postId);
    if (post === null) {
      return res.status(404).send(response("fail", "Cannot add comment to a non-existing post!"));
    }

    const comment = new Comment({
      postedBy: req.userId,
      comment: req.body.comment,
      createdAt: Date.now(),
    });
    await comment.save();
    await Post.findByIdAndUpdate(post._id, { $addToSet: { comments: comment._id } });

    return res.status(201).send(response("success", comment));
  } catch (error) {
    Sentry.captureException(error);
    return res.status(500).send(response("fail", error.message));
  }
}

async function deleteResourceFromCloudinary(req, res) {
  const { public_id, resource_type } = req.query;

  try {
    const { result } = await cloudinary.v2.uploader.destroy(public_id, { resource_type });
    if (result === "not found") {
      return res.status(404).send(response("fail", "Resource not found!"));
    }
    return res.send(response("success", "Resource successfully deleted!"));
  } catch (error) {
    Sentry.captureException(error);
    return res.status(500).send(response("fail", error.message));
  }
}

async function deletePost(req, res) {
  const id = req.params.postId;

  try {
    const post = await Post.findById(id);
    if (post === null) {
      return res.status(404).send(response("fail", "Post not found!"));
    } else if (post.postedBy !== req.userId) {
      return res.status(403).send(response("fail", "You can only delete your own posts!"));
    }

    await User.findByIdAndUpdate(req.userId, { $pull: { posts: post._id } });
    await Promise.all(
      post.comments.map(async (comment) => await Comment.findByIdAndDelete(comment._id))
    );
    await cloudinary.v2.uploader.destroy(post.public_id, { resource_type: post.resource_type });
    await Post.findByIdAndDelete(post._id);

    return res.send(response("success", "Post successfully deleted!"));
  } catch (error) {
    Sentry.captureException(error);
    return res.status(500).send(response("fail", error.message));
  }
}

async function editPost(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send(response("fail", errors.array()[0].msg));
  }

  const postId = req.params.postId;
  const { location, description } = req.body;

  try {
    const post = await Post.findByIdAndUpdate(postId, { location, description }, { new: true });
    if (post === null) {
      return res.status(404).send(response("fail", "Post not found!"));
    }

    return res.send(response("success", post));
  } catch (error) {
    Sentry.captureException(error);
    return res.status(500).send(response("fail", error.message));
  }
}

module.exports = {
  createAPost,
  getPost,
  getFeed,
  handleAction,
  addComment,
  deletePost,
  editPost,
  deleteResourceFromCloudinary,
};
