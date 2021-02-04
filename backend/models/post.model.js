sql = require("../models/db.js");
// constructor
const Post = function (post) {
    this.user_id = post.user_id;
    this.content = post.content;
    this.image = post.image;
    this.likes = post.likes;
    this.adminApproved = post.adminApproved;
    this.reported = post.reported;
};

//This function gets all the infos that will appear on the posts (ie : name of the poster, avatar, content, etc...)
Post.getAll = (result) => {
    sql.query(
        //this query selects relevant infos in the posts and users tables, and joins them with the userID
        "SELECT posts.id, posts.user_id, posts.content, posts.image, posts.likes, posts.adminApproved, posts.reported, users.avatar, users.firstname, users.lastname FROM posts INNER JOIN users ON posts.user_id = users.id ORDER BY posts.id ASC",
        (err, res) => {
            if (err) {
                console.log("error : ", err);
                result(null, err);
                return;
            }
            result(null, res);
        }
    );
};

//this function creates a new post
Post.createPost = (newPost, result) => {
    sql.query("INSERT INTO posts SET ? ", newPost, (err, res) => {
        if (err) {
            console.log("error :", err);
            result(err, null);
            return;
        }
        result(null, { id: res.insertId, ...newPost });
    });
};

Post.like = (postId, userId, result) => {
    //see if the user has already liked this post
    sql.query(`SELECT * FROM likes WHERE likes.post_id = ${postId} AND likes.user_id = ${userId}`, (err, res) => {
        if (err) {
            console.log("error :", err);
            result(err, null);
            return;
        } else if (res.length == 0) {
            // if the user hasn't liked the post yet
            //add 1 to the likes counter in the post table
            sql.query(`UPDATE posts SET posts.likes = posts.likes + 1 WHERE id = ${postId}`, (err) => {
                if (err) {
                    console.log("error :", err);
                    result(err, null);
                    return;
                }
            });
            //add the post_id and user_id to the likes table
            sql.query(`INSERT INTO likes SET likes.post_id = ${postId}, likes.user_id = ${userId}`, (err) => {
                if (err) {
                    console.log("error :", err);
                    result(err, null);
                    return;
                }
            });
        } else {
            //if the user has already liked the post
            //remove the like from the post
            sql.query(`UPDATE posts SET posts.likes = posts.likes - 1 WHERE id = ${postId}`, (err) => {
                if (err) {
                    console.log("error :", err);
                    result(err, null);
                    return;
                }
            });
            //delete the post_id and user_id to the likes table
            sql.query(`DELETE FROM likes WHERE likes.post_id = ${postId} AND likes.user_id = ${userId}`, (err) => {
                if (err) {
                    console.log("error :", err);
                    result(err, null);
                    return;
                }
            });
        }
    });
};

Post.delete = (postId, result) => {
    sql.query(`DELETE FROM posts WHERE posts.id = ${postId}`, (err, res) => {
        if (err) {
            console.log("error :", err);
            result(err, null);
            return;
        } else {
            result(null, res[0]);
            return;
        }
    });
};

Post.approve = (postId, result) => {
    sql.query(`UPDATE posts SET posts.adminApproved = 1 WHERE posts.id = ${postId}`, (err, res) => {
        if (err) {
            console.log("error :", err);
            result(err, null);
            return;
        } else {
            result(null, res[0]);
            return;
        }
    });
    sql.query(`UPDATE posts SET posts.reported = 0 WHERE posts.id = ${postId}`, (err, res) => {
        if (err) {
            console.log("error :", err);
            result(err, null);
            return;
        } else {
            result(null, res[0]);
            return;
        }
    });
};

Post.report = (postId, result) => {
    sql.query(`UPDATE posts SET posts.reported = 1 WHERE posts.id = ${postId}`, (err, res) => {
        if (err) {
            console.log("error :", err);
            result(err, null);
            return;
        } else {
            result(null, res[0]);
            return;
        }
    });
    sql.query(`UPDATE posts SET posts.adminApproved = 0 WHERE posts.id = ${postId}`, (err, res) => {
        if (err) {
            console.log("error :", err);
            result(err, null);
            return;
        } else {
            result(null, res[0]);
            return;
        }
    });
};

module.exports = Post;
