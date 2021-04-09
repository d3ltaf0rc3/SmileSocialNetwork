const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");
const cloudinary = require("cloudinary");

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

async function createAPost(req, res) {
    try {
        const newPost = new Post({
            ...req.body,
            postedBy: req.userId,
            createdAt: Date.now()
        });
        const post = await newPost.save();
        await User.findByIdAndUpdate(req.userId, {
            $addToSet: {
                posts: post._id
            }
        });
        return res.status(201).send(post);
    } catch (error) {
        return res.status(500).send({
            error: error.message
        });
    }
}

async function getPost(req, res) {
    const postId = req.params.id;

    try {
        const post = await Post.findOne({ _id: postId })
            .populate("postedBy")
            .populate({
                path: "comments",
                populate: {
                    path: "postedBy"
                }
            });
        return res.send(post);
    } catch (error) {
        return res.status(500).send({
            error: error.message
        });
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
                        populate: {
                            path: "postedBy"
                        }
                    }
                }
            });

        user.following.forEach(user => {
            user.posts.forEach(post => {
                posts.push(post);
            });
        });

        const sorted = posts.sort((a, b) => b.createdAt - a.createdAt);
        return res.send(sorted);
    } catch (error) {
        return res.status(500).send({
            error: error.message
        });
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
        return res.status(500).send({
            error: error.message
        });
    }
}

async function addComment(req, res) {
    const postId = req.params.postId;

    try {
        const comment = new Comment({
            postedBy: req.userId,
            comment: req.body.comment
        });
        const createdComment = await comment.save();
        await Post.findByIdAndUpdate(postId, { $addToSet: { comments: createdComment._id } });
        return res.status(204).send();
    } catch (error) {
        return res.status(500).send({
            error: error.message
        });
    }
}

async function deletePostFromCloudinary(req, res) {
    const public_id = req.params.id;

    try {
        await cloudinary.v2.uploader.destroy(public_id);
    } catch (error) {
        return res.status(500).send(error);
    }
}

async function deletePost(req, res) {
    const id = req.params.postId;

    try {
        const post = await Post.findByIdAndDelete(id);
        post.comments.forEach(async comment => await Comment.findByIdAndDelete(comment._id));
        await cloudinary.v2.uploader.destroy(post.public_id, { resource_type: post.imageUrl.includes("video") ? "video" : "image" });
        await User.findByIdAndUpdate(req.userId, { $pull: { posts: id } });
        return res.status(204).send();
    } catch (error) {
        return res.status(500).send(error);
    }
}

async function editPost(req, res) {
    const postId = req.params.postId;

    try {
        await Post.findByIdAndUpdate(postId, {
            location: req.body.location,
            description: req.body.description
        });
        return res.status(204).send();
    } catch (error) {
        return res.status(500).send(error);
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