const User = require("../models/user.model");

exports.getAll = (req, res) => {
    User.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Une erreur est apparue en récupérant les utilisateurs",
            });
        else res.send(data);
    });
};
