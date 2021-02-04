const express = require("express");
const router = express.Router(); //using the router function

const feed = require("../controllers/feed.controller"); //path to the right controller
const auth = require("../middlewares/auth"); //authentication middleware
const multer = require("../middlewares/multer-config"); //images management middleware

router.get("/", auth, feed.list_all_posts); //router.httpVerb('URL', path to the right controller)

router.post("/", auth, multer, feed.post_something);

router.post("/comments", auth, feed.retrieve_comments);

router.post("/comments/newcomment", auth, feed.comment_a_post);

router.post("/like", auth, feed.like_a_post);

router.delete("/deletepost", auth, feed.delete_a_post);

router.delete("/deletecomment", auth, feed.delete_a_comment);

router.put("/approvepost", auth, feed.approve_a_post);

router.put("/reportpost", auth, feed.report_a_post);

module.exports = router;
