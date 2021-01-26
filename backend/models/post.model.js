sql = require("../models/db.js");
// constructor
const Post = function (post) {
    this.user_id = post.user_id;
    this.content = post.content;
    this.image = post.image;
    this.likes = post.likes;
    this.comments = post.comments;
};

//This function gets all the infos that will appear on the posts (ie : name of the poster, avatar, content, etc...)
Post.getAll = (result) => {
    sql.query(
        //this query selects relevant infos in the posts and users tables, and joins them with the userID
        "SELECT posts.id, posts.content, posts.image, posts.likes, posts.comments, users.avatar, users.firstname, users.lastname FROM posts INNER JOIN users ON posts.user_id=users.id",
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

        console.log("New post created");
        result(null, { id: res.insertId, ...newPost });
    });
};

module.exports = Post;
