const User = require("../models/user.model.js");
sql = require("../models/db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.create_an_account = function (req, res) {
    //if there's no content sent, error
    if (!req.body) {
        res.status(400).send({
            message: "You must fill-in the form!",
        });
    } else {
        //hash password
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

    //if email and password are filled-in
    if (email && password) {
        //get all infos about the user that has the email
        sql.query("SELECT * FROM users WHERE email = ?", email, (error, results, _fields) => {
            //if the email does exist in the db
            if (results.length > 0) {
                //compare the given password to one in the db
                bcrypt.compare(password, results[0].password).then((valid) => {
                    // if it doesn't match, throw error
                    if (!valid) {
                        res.status(401).json({ message: "Wrong password" });
                    } else {
                        //if it matches, send the infos and create auth token
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
                // if the email doesn't match, throw error
                res.status(401).json({ message: "Wrong email adress" });
            }
        });
    } else {
        //if the form isn't filled-in, throw error
        res.status(500).json({ message: "You must fill-in the form" });
    }
};
