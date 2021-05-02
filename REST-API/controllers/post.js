const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");
const cloudinary = require("cloudinary");
const { deletePostSensitiveData } = require("../utils/deleteSensitiveData");

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

async function createAPost(req, res) {
    const { imageUrl, location, description, public_id } = req.body;

    try {
        const post = new Post({
            imageUrl,
            location,
            description,
            public_id,
            postedBy: req.userId,
            createdAt: Date.now()
        });
        await post.save();
        await User.findByIdAndUpdate(req.userId, { $addToSet: { posts: post._id } });

        const postToSend = deletePostSensitiveData(post);
        return res.status(201).send(postToSend);
    } catch (error) {
        return res.status(500).send(error.message);
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

        const postToSend = deletePostSensitiveData(post);
        return res.send(postToSend);
    } catch (error) {
        return res.status(500).send(error.message);
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
                    }
                }
            });

        user.following.forEach(user => {
            user.posts.forEach(post => {
                const postToSend = deletePostSensitiveData(post);
                posts.push(postToSend);
            });
        });

        const sorted = posts.sort((a, b) => b.createdAt - a.createdAt);
        return res.send(sorted);
    } catch (error) {
        return res.status(500).json(error.message);
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
        return res.status(204).send();
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

async function addComment(req, res) {
    const postId = req.params.postId;

    try {
        const comment = new Comment({ postedBy: req.userId, comment: req.body.comment });
        await comment.save();
        await Post.findByIdAndUpdate(postId, { $addToSet: { comments: comment._id } });

        return res.status(204).send();
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

async function deletePostFromCloudinary(req, res) {
    const { public_id, url } = req.body;

    try {
        await cloudinary.v2.uploader.destroy(public_id, { resource_type: url.includes("video") ? "video" : "image" });
        return res.status(204).send();
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

async function deletePost(req, res) {
    const id = req.params.postId;

    try {
        await User.findByIdAndUpdate(req.userId, { $pull: { posts: id } });
        const post = await Post.findByIdAndDelete(id);
        post.comments.forEach(async comment => await Comment.findByIdAndDelete(comment._id));
        await cloudinary.v2.uploader.destroy(post.public_id, { resource_type: post.imageUrl.includes("video") ? "video" : "image" });

        return res.status(204).send();
    } catch (error) {
        return res.status(500).send(error.message);
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

module.exports = {
    createAPost,
    getPost,
    getFeed,
    handleAction,
    addComment,
    deletePost,
    editPost,
    deletePostFromCloudinary
};