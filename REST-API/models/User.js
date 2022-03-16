const mongoose = require("mongoose");
const { DEFAULT_PICTURE } = require("../utils/constants");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    default: null,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    default: DEFAULT_PICTURE,
  },
  public_id: {
    type: String,
    default: null,
  },
  description: {
    type: String,
    default: null,
  },
  isPrivate: {
    type: Boolean,
    default: false,
  },
  followers: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
  ],
  following: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
  ],
  posts: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Post",
    },
  ],
  requests: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
  ],
  sessions: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Session",
    }
  ],
});

module.exports = mongoose.model("User", UserSchema);
