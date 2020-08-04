const Post = require("../models/Post");
const User = require("../models/User");
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
        const post = await Post.findOne({ _id: postId }).populate("postedBy");
        return res.send(post);
    } catch (error) {
        return res.status(500).send({
            error: error.message
        });
    }
}

async function getFeed(req, res) {
    const following = req.body.following;
    const postsRefs = [];
    const posts = [];

    try {
        following.forEach(user => {
            user.posts.forEach(post => {
                postsRefs.push(post);
            });
        });
        for (let i = 0; i < postsRefs.length; i++) {
            const id = postsRefs[i];
            const post = await Post.findById(id).populate("postedBy");
            posts.push(post);
        }
        const sorted = posts.sort((a, b) => b.createdAt - a.createdAt);
        return res.send({
            posts: sorted
        });
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

module.exports = {
    createAPost,
    getPost,
    getFeed,
    likePost,
    unlikePost
};