const express = require("express");
const router = express.Router(); //using the router function
const auth = require("../middlewares/auth"); //authentication middleware

const feed = require("../controllers/feed.controller"); //path to the right controller

router.get("/", auth, feed.list_all_posts); //router.httpVerb('URL', path to the right controller)

router.post("/", auth, feed.post_something);

module.exports = router;
