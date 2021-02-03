const Post = require("../models/post.model.js");
const Comment = require("../models/comment.model.js");
const jwt = require("jsonwebtoken");

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

    const token = req.headers.authorization.split(" ")[1]; //extracting token from authorization header
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET"); //decoding token with the key indicated at controllers/user.controller.js:53
    const userId = decodedToken.userId; //defining decoded token as user id

    if (!req.file) {
        const post = new Post({
            user_id: userId,
            content: req.body.content,
            image: null,
            likes: 0,
            adminApproved: 0,
        });

        //save post to the db
        Post.createPost(post, (err, data) => {
            if (err)
                res.status(500).send({
                    message: err.message || "Something went wrong when creating a new post !",
                });
            else res.send(data);
        });
    } else if (req.file) {
        const post = new Post({
            user_id: userId,
            content: req.body.content,
            image: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
            likes: 0,
            adminApproved: 0,
        });

        //save post to the db
        Post.createPost(post, (err, data) => {
            if (err)
                res.status(500).send({
                    message: err.message || "Something went wrong when creating a new post !",
                });
            else res.send(data);
        });
    }
};

exports.like_a_post = (req, res) => {
    const token = req.headers.authorization.split(" ")[1]; //extracting token from authorization header
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET"); //decoding token with the key indicated at controllers/user.controller.js:53
    const userId = decodedToken.userId; //defining decoded token as user id*/
    const postId = req.body.post_id;

    Post.like(postId, userId, (err) => {
        if (err)
            res.status(500).send({
                message: err.message || "Something went wrong when liking the post !",
            });
    });
};

exports.retrieve_comments = (req, res) => {
    const postId = req.body.post_id;

    Comment.get(postId, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "An error occured while retrieving posts",
            });
        else res.send(data);
    });
};

exports.comment_a_post = (req, res) => {
    const token = req.headers.authorization.split(" ")[1]; //extracting token from authorization header
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET"); //decoding token with the key indicated at controllers/user.controller.js:53
    const userId = decodedToken.userId; //defining decoded token as user id*/

    const comment = new Comment({
        post_id: req.body.post_id,
        user_id: userId,
        content: req.body.content,
    });

    Comment.createComment(comment, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Something went wrong when creating a new comment !",
            });
        else res.send(data);
    });
};

exports.delete_a_post = (req, res) => {
    const postId = req.body.post_id;

    Post.delete(postId, (err, data) => {
        if (err) {
            res.status(500).send({
                message: "Error deleting the post with id :" + postId,
            });
        } else res.send(data);
    });
};

exports.approve_a_post = (req, res) => {
    const postId = req.body.post_id;

    Post.approve(postId, (err, data) => {
        if (err) {
            res.status(500).send({
                message: "Error deleting the post with id :" + postId,
            });
        } else res.send(data);
    });
};

exports.delete_a_comment = (req, res) => {
    const commentId = req.body.comment_id;

    Comment.delete(commentId, (err, data) => {
        if (err) {
            res.status(500).send({
                message: "Error deleting the post with id :" + postId,
            });
        } else res.send(data);
    });
};
