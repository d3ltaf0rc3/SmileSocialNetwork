const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        default: null
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    profilePicture: {
        type: String,
        default: "https://res.cloudinary.com/smile-social-network/image/upload/v1600976280/download_udtdbe.png"
    },
    description: {
        type: String,
        default: null
    },
    isPrivate: {
        type: Boolean,
        default: false
    },
    followers: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User"
    }],
    following: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User"
    }],
    posts: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Post"
    }],
    requests: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User"
    }]
});

module.exports = mongoose.model("User", UserSchema);