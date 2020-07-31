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
        const post = await Post.findOne({_id: postId}).populate("postedBy");
        return res.send(post);
    } catch (error) {
        return res.status(500).send({
            error: error.message
        });
    }
}

async function getPosts(req, res) {
    const username = req.params.username;

    try {
        const user = await User.findOne({ username }).populate("posts");
        const sortedPosts = user.posts.sort((a,b) => b.createdAt - a.createdAt);
        return res.send(sortedPosts);
    } catch (err) {
        return res.status(500).send({
            error: err.message
        });
    }
}

module.exports = {
    createAPost,
    getPost,
    getPosts
};