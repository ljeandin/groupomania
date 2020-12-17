const express = require("express");
const router = express.Router(); //using the router function

const users = require("../controllers/user.controller"); //path to the right controller

router.get("/signup", users.getAll); //router.httpVerb('URL', path to the right controller)
//router.post("/login", userCtrl.login);

module.exports = router;
