sql = require("../models/db.js");
// constructor
const User = function (user) {
    this.id = user.id;
    this.avatar = user.avatar;
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.email = user.email;
    this.password = user.password;
    this.isAdmin = user.isAdmin;
};

User.getAll = (result) => {
    sql.query("SELECT * FROM users", (err, res) => {
        if (err) {
            console.log("error : ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};
module.exports = User;
