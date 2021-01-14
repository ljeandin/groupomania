const express = require("express");
const router = express.Router(); //using the router function

const feed = require("../controllers/feed.controller"); //path to the right controller

router.get("/", feed.list_all_posts); //router.httpVerb('URL', path to the right controller)

module.exports = router;
