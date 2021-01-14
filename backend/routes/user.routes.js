const express = require("express");
const router = express.Router(); //using the router function

const user = require("../controllers/user.controller"); //path to the right controller

router.get("/feed", user.list_all_users); //router.httpVerb('URL', path to the right controller)
//router.post("/login", userCtrl.login);

module.exports = router;
