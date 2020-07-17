const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        default: null
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
    }]
});

module.exports = mongoose.model("User", UserSchema);