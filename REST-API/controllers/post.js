const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");
const cloudinary = require("cloudinary");
const { validationResult } = require("express-validator");
const { deletePostSensitiveData } = require("../utils/deleteSensitiveData");
const response = require("../utils/responseGenerator");

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

async function createAPost(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send(response("fail", errors.array()[0].msg));
    }

    const { resource, location, description, public_id } = req.body;

    try {
        const post = new Post({
            resource,
            location,
            description,
            public_id,
            postedBy: req.userId,
            createdAt: Date.now()
        });
        await post.save();
        await User.findByIdAndUpdate(req.userId, { $addToSet: { posts: post._id } });

        const postToSend = deletePostSensitiveData(post);
        return res.status(201).send(response("success", postToSend));
    } catch (error) {
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
                    select: 'username profilePicture'
                }
            });

        if (post === null) {
            return res.status(404).send(response("fail", "Post not found!"));
        }

        const postToSend = deletePostSensitiveData(post);
        return res.send(response("success", postToSend));
    } catch (error) {
        return res.status(500).send(response("fail", error.message));
    }
}

async function getFeed(req, res) {
    const posts = [];

    try {
        const user = await User.findById(req.userId)
            .populate({
                path: "following",
                populate: {
                    path: "posts",
                    populate: {
                        path: "postedBy comments",
                        select: "username profilePicture postedBy createdAt comment",
                        populate: {
                            path: "postedBy",
                            select: "username"
                        }
                    },
                    options: {
                        limit: 10,
                    }
                },
            });

        user.following.forEach(user => {
            user.posts.forEach(post => {
                const postToSend = deletePostSensitiveData(post);
                posts.push(postToSend);
            });
        });

        const sorted = posts.sort((a, b) => b.createdAt - a.createdAt);
        return res.send(response("success", sorted));
    } catch (error) {
        return res.status(500).json(response("fail", error.message));
    }
}

async function handleAction(req, res) {
    const postId = req.params.postId;
    const action = req.params.action;

    try {
        if (action === "like") {
            await Post.findByIdAndUpdate(postId, { $addToSet: { likes: req.userId } });
        } else if (action === "unlike") {
            await Post.findByIdAndUpdate(postId, { $pull: { likes: req.userId } });
        }
        return res.send(response("success", "Action completed successfully!"));
    } catch (error) {
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
            return res.status(400).send(response("fail", "Cannot add comment to a non-existing post!"));
        }

        const comment = new Comment({ postedBy: req.userId, comment: req.body.comment, createdAt: Date.now() });
        await comment.save();
        await Post.findByIdAndUpdate(postId, { $addToSet: { comments: comment._id } });

        return res.send(response("success", comment));
    } catch (error) {
        return res.status(500).send(response("fail", error.message));
    }
}

async function deleteResourceFromCloudinary(req, res) {
    const { public_id, resource_type } = req.query;

    try {
        const { result } = await cloudinary.v2.uploader.destroy(public_id, { resource_type });
        if (result === 'not found') {
            return res.status(404).send(response("fail", "Resource not found!"));
        }
        return res.send(response("success", "Resource successfully deleted!"));
    } catch (error) {
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

        await Post.findByIdAndDelete(id);
        await User.findByIdAndUpdate(req.userId, { $pull: { posts: id } });
        post.comments.forEach(async comment => await Comment.findByIdAndDelete(comment._id));
        await cloudinary.v2.uploader.destroy(post.public_id, { resource_type: post.imageUrl.includes("video") ? "video" : "image" });

        return res.send(response("success", "Post successfully deleted!"));
    } catch (error) {
        return res.status(500).send(response("fail", error.message));
    }
}

async function editPost(req, res) {
    const postId = req.params.postId;
    const { location, description } = req.body;

    try {
        await Post.findByIdAndUpdate(postId, { location, description });
        return res.status(204).send();
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

async function getProfilePosts(req, res) {
    const { id } = req.params;
    try {
        const user = await User.findById(id)
            .populate({
                path: "posts",
                select: 'imageUrl',
                options: { sort: { createdAt: -1 } }
            });

        return res.send(user.posts);
    } catch (error) {
        return res.status(500).send(error.message);
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
    getProfilePosts
};