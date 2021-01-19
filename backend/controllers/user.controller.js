const User = require("../models/user.model.js");
sql = require("../models/db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.create_an_account = function (req, res) {
    //Check if there is content
    if (!req.body) {
        res.status(400).send({
            message: "You must fill-in the form!",
        });
        /***Insert validation here***/
    } else {
        bcrypt
            .hash(req.body.password, 10) //password hashing
            .then((hash) => {
                //create a new user with the frontend inputs
                const user = new User({
                    avatar: req.body.avatar,
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    email: req.body.email,
                    password: hash,
                    isAdmin: 0,
                });

                //save post to the db
                User.signup(user, (err, data) => {
                    if (err)
                        res.status(500).send({
                            message: err.message || "Something went wrong when creating the user !",
                        });
                    else res.send(data);
                });
            });
    }
};

exports.connect_to_account = function (req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

    if (email && password) {
        sql.query("SELECT * FROM users WHERE email = ?", email, (error, results, _fields) => {
            if (results.length > 0) {
                bcrypt.compare(password, results[0].password).then((valid) => {
                    if (!valid) {
                        res.status(401).json({ message: "The password is wrong" });
                    } else {
                        console.log(email, "is logged-in");
                        res.status(200).json({
                            userId: results[0].id,
                            email: results[0].email,
                            token: jwt.sign({ userId: results[0].id }, "RANDOM_TOKEN_SECRET", {
                                expiresIn: "24h",
                            }),
                        });
                    }
                });
            } else {
                res.status(401).json({ message: "One of your field is wrong" });
            }
        });
    } else {
        res.status(500).json({ message: "You must fill-in the form" });
    }
};

exports.get_user_infos = function (req, res) {
    User.getUser(req.params.userId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: "Can't find user with this id : " + req.params.userId,
                });
            } else {
                res.status(500).send({
                    message: "An error happened when retrieving user with id" + req.params.userId,
                });
            }
        } else res.send(data);
    });
};
