const Post = require("../models/post.model.js");
const Comment = require("../models/comment.model.js");
const jwt = require("jsonwebtoken");

//this retrieves all posts
exports.list_all_posts = (req, res) => {
    Post.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "An error occured while retrieving posts",
            });
        else res.send(data);
    });
};

//this creates a new post
exports.post_something = (req, res) => {
    //Check if there is content
    if (!req.body) {
        res.status(400).send({
            message: "You must add content to your post!",
        });
    }

    //getting the connected user's id
    const token = req.headers.authorization.split(" ")[1]; //extracting token from authorization header
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET"); //decoding token with the key indicated at controllers/user.controller.js:53
    const userId = decodedToken.userId; //defining decoded token as user id

    //if no image is sent
    if (!req.file) {
        //create a new post with the input the user sent
        const post = new Post({
            user_id: userId, //decoded userId from the token
            content: req.body.content,
            image: null, //no image
            //initializing values to 0
            likes: 0,
            adminApproved: 0,
            reported: 0,
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
        //if there's an image with the post, create a new post with the input the user sent
        const post = new Post({
            user_id: userId, //decoded userId from the token
            content: req.body.content,
            image: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`, //link to image (filename provided by multer)
            //initializing values to 0
            likes: 0,
            adminApproved: 0,
            reported: 0,
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

//this is for liking a new post
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

//this deletes a post
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

//this approves a post
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

//this is to report a post
exports.report_a_post = (req, res) => {
    const postId = req.body.post_id;

    Post.report(postId, (err, data) => {
        if (err) {
            res.status(500).send({
                message: "Error reporting the post with id :" + postId,
            });
        } else res.send(data);
    });
};

//this is for getting the comments under a post
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

//this is for commenting a post
exports.comment_a_post = (req, res) => {
    const token = req.headers.authorization.split(" ")[1]; //extracting token from authorization header
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET"); //decoding token with the key indicated at controllers/user.controller.js:53
    const userId = decodedToken.userId; //defining decoded token as user id*/

    //defines new comment with the body sent by the frontend
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

//this deletes a comment
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
