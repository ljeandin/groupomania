User = require("../models/user.model.js");

exports.getAll = (req, res) => {
    User.getAll = (req, res, next) => {
        User.find()
            .then((sauces) => res.status(200).json(sauces))
            .catch((error) => res.status(400).json({ error }));
    };
};
