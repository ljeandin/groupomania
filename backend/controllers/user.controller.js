const User = require("../models/user.model.js");

/*exports.getAllUsers = (req, res) => {
    User.getAllUsers = (req, res, next) => {
        User.find()
            .then((users) => res.status(200).json(users))
            .catch((error) => res.status(400).json({ error }));
    };
};*/

exports.list_all_users = function (req, res) {
    User.getAllUsers(function (err, task) {
        console.log("controller");
        if (err) res.send(err);
        console.log("res", task);
        res.send(task);
    });
};
