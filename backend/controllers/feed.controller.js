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

/*exports.post_something = (req, res) => {
    //Validate if there is a request
    if (!req.body) {
        res.status(400).send({
            message: "You must add content to your post!",
        });
    }

    //create a new post
    const post = new Post({
        content: req.body.content,
        image: req.body.image,
    });

    //send post to the db
    Post.createPost(post, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Something went wrong when creating a new post !",
            });
        else res.send(data);
    });
};*/
