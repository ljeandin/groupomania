const Post = require("../models/post.model.js");

exports.list_all_posts = (req, res) => {
    Post.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "An error occured while retrieving posts",
            });
        else res.send(data);
    });
};

exports.post_something = (req, res) => {
    //Check if there is content
    if (!req.body) {
        res.status(400).send({
            message: "You must add content to your post!",
        });
    }

    /***Insert validation here***/

    //create a new post with the frontend inputs
    const post = new Post({
        user_id: req.body.user_id,
        content: req.body.content,
        image: req.body.image,
    });

    //save post to the db
    Post.createPost(post, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Something went wrong when creating a new post !",
            });
        else res.send(data);
    });
};
