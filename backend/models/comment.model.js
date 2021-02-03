sql = require("../models/db.js");

// constructor
const Comment = function (comment) {
    this.id = comment.id;
    this.user_id = comment.user_id;
    this.post_id = comment.post_id;
    this.content = comment.content;
};

Comment.get = (postId, result) => {
    sql.query(
        //this query selects relevant infos in the comments and past tables, and joins them with the post_id
        `SELECT comments.id, comments.user_id, comments.post_id, comments.content, users.firstname, users.lastname, users.avatar FROM comments INNER JOIN users ON comments.user_id = users.id WHERE comments.post_id = ${postId}`,
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

Comment.createComment = (newComment, result) => {
    sql.query("INSERT INTO comments SET ?", newComment, (err, res) => {
        if (err) {
            console.log("error :", err);
            result(err, null);
            return;
        }

        console.log("New comment created");
        result(null, { id: res.insertId, ...newComment });
    });
};

Comment.delete = (commentId, result) => {
    sql.query(`DELETE FROM comments WHERE comments.id = ${commentId}`, (err, res) => {
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

module.exports = Comment;
