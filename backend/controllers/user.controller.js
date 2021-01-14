const User = require("../models/user.model.js");

/*exports.getAllUsers = (req, res) => {
    User.getAllUsers = (req, res, next) => {
        User.find()
            .then((users) => res.status(200).json(users))
            .catch((error) => res.status(400).json({ error }));
    };
};*/

exports.list_all_users = function (req, res) {
    sql.query("SELECT * FROM users", function (result) {
        console.log(result);
    })
        .then((users) => res.status(200).json(users))
        .catch((error) => res.status(400).json({ error }));
};

/*exports.index = function (req, res) {
    res.json({ message: "Welcome" });
};*/
