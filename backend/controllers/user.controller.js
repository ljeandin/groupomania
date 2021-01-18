const User = require("../models/user.model.js");

exports.list_all_users = function (res) {
    User.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving customers.",
            });
        else res.send(data);
    });
};

exports.create_an_account = function (req, res) {
    //Check if there is content
    if (!req.body) {
        res.status(400).send({
            message: "You must fill-in the form!",
        });
    }

    //create a new user with the frontend inputs
    const user = new User({
        avatar: req.body.avatar,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
    });

    //save post to the db
    User.signup(user, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Something went wrong when creating the user !",
            });
        else res.send(data);
    });
};
