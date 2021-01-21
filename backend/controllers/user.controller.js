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

exports.connect_to_account = function (req, res) {
    const email = req.body.email;
    const password = req.body.password;

    if (email && password) {
        sql.query("SELECT * FROM users WHERE email = ?", email, (error, results, _fields) => {
            if (results.length > 0) {
                bcrypt.compare(password, results[0].password).then((valid) => {
                    if (!valid) {
                        res.status(401).json({ message: "Wrong password" });
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
    /*User.findOne(req.body.email, (err) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: "No user found with this email : " + req.body.email,
                });
            } else {
                res.status(500).send({
                    message: "An error happened when trying to retrieve user with this email : " + req.body.email,
                });
            }
        } else {
            bcrypt
                .compare(req.body.password, result[0].password) //else comparing password to see if it matches
                .then((valid) => {
                    if (!valid) {
                        //if invalid, error message
                        res.status(401).send({
                            message: "Wrong password !",
                        });
                    }
                    res.status(200).json({
                        userId: result[0].id,
                        token: jwt.sign(
                            // creating new token with user ID, token key and expiration limit
                            { userId: result[0].id },
                            "RANDOM_TOKEN_SECRET",
                            { expiresIn: "24h" }
                        ),
                    });
                })
                .catch((error) => res.status(500).json({ error }));
        }
    });*/
};
