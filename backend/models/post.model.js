const { post } = require("../app.js");

sql = require("../models/db.js");
// constructor
const Post = function (post) {
    this.id = post.id;
    this.user_id = post.user_id;
    this.content = post.content;
    this.image = post.image;
    this.likes = post.likes;
    this.comments = post.comments;
};

Post.getAll = (result) => {
    sql.query("SELECT * FROM posts", (err, res) => {
        if (err) {
            console.log("error : ", err);
            result(null, err);
            return;
        }

        console.log("users: ", res);
        result(null, res);
    });
};
module.exports = Post;
