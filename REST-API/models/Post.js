const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    postedBy: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true
    },
    location: {
        type: String,
        default: ""
    },
    imageUrl: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    likes: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User"
    }],
    comments: []
});

module.exports = mongoose.model("Post", PostSchema);