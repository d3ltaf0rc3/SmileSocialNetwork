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
            location: location || null,
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

module.exports = {
    createAPost
};