const express = require("express");
const router = express.Router(); //using the router function

const feed = require("../controllers/feed.controller"); //path to the right controller
const auth = require("../middlewares/auth"); //authentication middleware
const multer = require("../middlewares/multer-config"); //images management middleware

router.get("/", auth, feed.list_all_posts); //router.httpVerb('URL', path to the right controller)

router.post("/", auth, /*multer,*/ feed.post_something);

router.post("/comments", auth, feed.retrieve_comments);

module.exports = router;
