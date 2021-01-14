const User = require("../models/user.model.js");

/*exports.getAllUsers = (req, res) => {
    User.getAllUsers = (req, res, next) => {
        User.find()
            .then((users) => res.status(200).json(users))
            .catch((error) => res.status(400).json({ error }));
    };
};*/

exports.list_all_users = function (req, res) {
    User.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving customers.",
            });
        else res.send(data);
    });
};

/*exports.index = function (req, res) {
    res.json({ message: "Welcome" });
};*/
