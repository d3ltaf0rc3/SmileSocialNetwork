const Post = require("../models/Post");
const User = require("../models/User");

module.exports = {
    get: (req, res, next) => {
        Post.find().populate("author")
            .then((origamis) => res.send(origamis))
            .catch(next);
    },

    post: (req, res, next) => {
        const { description } = req.body;
        const { _id } = req.user;

        Post.create({ description, author: _id })
            .then((createdOrigami) => {
                return Promise.all([
                    User.updateOne({ _id }, { $push: { posts: createdOrigami } }),
                    Post.findOne({ _id: createdOrigami._id })
                ]);
            })
            .then(([modifiedObj, origamiObj]) => {
                res.send(origamiObj);
            })
            .catch(next);
    },

    put: (req, res, next) => {
        const id = req.params.id;
        const { description } = req.body;
        Post.updateOne({ _id: id }, { description })
            .then((updatedOrigami) => res.send(updatedOrigami))
            .catch(next);
    },

    delete: (req, res, next) => {
        const id = req.params.id;
        Post.deleteOne({ _id: id })
            .then((removedOrigami) => res.send(removedOrigami))
            .catch(next);
    }
};