const express = require("express");
const router = express.Router(); //using the router function
const auth = require("../middlewares/auth");

const user = require("../controllers/user.controller"); //path to the right controller

router.post("/signup", user.create_an_account);

router.post("/login", user.connect_to_account);

router.get("/getone", auth, user.get_user_infos);

//router.get("/connected/:id", user.get_user_infos);

module.exports = router;
