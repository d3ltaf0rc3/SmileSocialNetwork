const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    postedBy: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        default: null
    },
    imageUrl: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: null
    },
    public_id: {
        type: String,
        required: true
    },
    likes: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User"
    }],
    comments: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Comment"
    }]
});

module.exports = mongoose.model("Post", PostSchema);