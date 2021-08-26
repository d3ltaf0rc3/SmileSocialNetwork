const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    postedBy: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Comment", CommentSchema);
