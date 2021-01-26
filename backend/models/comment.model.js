sql = require("../models/db.js");

// constructor
const Comment = function (comment) {
    this.user_id = comment.user_id;
    this.post_id = comment.post_id;
    this.content = comment.content;
};

Comment.getAll = (postId, result) => {
    sql.query(
        //this query selects relevant infos in the comments and past tables, and joins them with the post_id
        `SELECT comments.post_id, comments.content, users.firstname, users.lastname, users.avatar FROM comments INNER JOIN users ON comments.user_id = users.id WHERE comments.post_id = ${postId}`,
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

module.exports = Comment;
