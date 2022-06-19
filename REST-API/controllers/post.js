const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");
const Sentry = require("@sentry/node");
const cloudinary = require("cloudinary");
const { validationResult } = require("express-validator");
const response = require("../utils/responseGenerator");

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
    } else if (req.userId === post.postedBy.id) {
      return res.send(response("success", post));
    }

    const postOwner = await User.findById(post.postedBy.id);
    if (postOwner.isPrivate && !postOwner.followers.includes(req.userId)) {
      return res.status(403).send(response("fail", "You don't have access to the following resource!"));
    }

    return res.send(response("success", post));
  } catch (error) {
    Sentry.captureException(error);
    return res.status(500).send(response("fail", error.message));
  }
}

async function getUserPosts(req, res) {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username }).populate({
      path: "posts",
      select: "resource resource_type",
      options: { sort: { createdAt: -1 } },
    });

    if (user === null) {
      return res.status(404).send(response("fail", "User not found!"));
    }

    if (req.userId === user.id) {
      return res.send(response("success", user.posts));
    } else if (user.isPrivate && !user.followers.includes(req.userId)) {
      return res.status(403).send(response("fail", "You don't have access to the following resource!"));
    }

    return res.send(response("success", user.posts));
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

  if (action !== "like" && action !== "unlike") {
    return res.status(405).send(response("fail", "Unsupported action!"));
  }

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
    }

    return res.send(response("success", "Action completed successfully!"));
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
    } else if (post.postedBy.toString() !== req.userId) {
      return res.status(403).send(response("fail", "You can only delete your own posts!"));
    }

    await User.findByIdAndUpdate(req.userId, { $pull: { posts: post._id } });
    if (post.comments.length > 0) {
      await Promise.all(
        post.comments.map(async (comment) => await Comment.findByIdAndDelete(comment._id))
      );
    }
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

  const { postId } = req.params;
  const { location, description } = req.body;

  try {
    const post = await Post.findById(postId);
    if (post === null) {
      return res.status(404).send(response("fail", "Post not found!"));
    } else if (post.postedBy.toString() !== req.userId) {
      return res.status(403).send(response("fail", "You can only edit your own posts!"));
    }

    const newPost = await Post.findByIdAndUpdate(postId, { location, description }, { new: true });

    return res.send(response("success", newPost));
  } catch (error) {
    Sentry.captureException(error);
    return res.status(500).send(response("fail", error.message));
  }
}

module.exports = {
  createAPost,
  getPost,
  getUserPosts,
  getFeed,
  handleAction,
  deletePost,
  editPost,
};
