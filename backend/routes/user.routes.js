const express = require("express");
const router = express.Router(); //using the router function
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer-config-avatar");

const user = require("../controllers/user.controller"); //path to the right controller

router.post("/signup", multer, user.create_an_account);

router.post("/login", user.connect_to_account);

router.get("/getone", auth, user.get_user_infos);

router.post("/changeavatar", auth, multer, user.change_avatar);

module.exports = router;
