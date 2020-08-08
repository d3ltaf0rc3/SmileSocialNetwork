const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");
const { decodeCookie } = require("../utils/decode-cookie");

async function createAPost(req, res) {
    const { imageUrl, description, location } = req.body;
    try {
        const decoded = decodeCookie(req.cookies["auth-token"]);
        const newPost = new Post({
            imageUrl,
            description,
            location,
            postedBy: decoded.userID
        });
        const post = await newPost.save();
        await User.findByIdAndUpdate(decoded.userID, {
            $addToSet: {
                posts: post._id
            }
        });
        return res.send(post);
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
        const decoded = decodeCookie(req.cookies["auth-token"]);
        const user = await User.findById(decoded.userID)
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

async function likePost(req, res) {
    const postId = req.params.postId;

    try {
        const decoded = decodeCookie(req.cookies["auth-token"]);
        await Post.findByIdAndUpdate(postId, { $addToSet: { likes: decoded.userID } });
        return res.send({
            message: "Success!"
        });
    } catch (error) {
        return res.status(500).send({
            error: error.message
        });
    }
}

async function unlikePost(req, res) {
    const postId = req.params.postId;

    try {
        const decoded = decodeCookie(req.cookies["auth-token"]);
        await Post.findByIdAndUpdate(postId, { $pull: { likes: decoded.userID } });
        return res.send({
            message: "Success!"
        });
    } catch (error) {
        return res.status(500).send({
            error: error.message
        });
    }
}

async function addComment(req, res) {
    const postId = req.params.postId;

    try {
        const decoded = decodeCookie(req.cookies["auth-token"]);
        const comment = new Comment({
            postedBy: decoded.userID,
            comment: req.body.comment
        });
        const createdComment = await comment.save();
        await Post.findByIdAndUpdate(postId, { $addToSet: { comments: createdComment._id } });
        return res.send(createdComment);
    } catch (error) {
        return res.status(500).send({
            error: error.message
        });
    }
}

async function deletePost(req, res) {
    const id = req.params.postId;

    try {
        const decoded = decodeCookie(req.cookies["auth-token"]);
        await User.findByIdAndUpdate(decoded.userID, { $pull: { posts: id } });
        await Post.findByIdAndDelete(id);
        return res.send({
            message: "Success!"
        });
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
        return res.send({
            message: "Success!"
        });
    } catch (error) {
        return res.status(500).send(error);
    }
}

module.exports = {
    createAPost,
    getPost,
    getFeed,
    likePost,
    unlikePost,
    addComment,
    deletePost,
    editPost
};