const Post = require("../models/post.model.js");

exports.list_all_posts = function (req, res) {
    Post.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving customers.",
            });
        else res.send(data);
    });
};
