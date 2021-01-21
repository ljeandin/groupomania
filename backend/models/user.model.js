sql = require("./db.js");

// constructor
const User = function (user) {
    this.avatar = user.avatar;
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.email = user.email;
    this.password = user.password;
    this.isAdmin = user.isAdmin;
};
User.signup = (newUser, result) => {
    sql.query("INSERT INTO users SET ? ", newUser, (err, res) => {
        if (err) {
            console.log("error :", err);
            result(err, null);
            return;
        }

        console.log("The account has been created ");
        result(null, { id: res.insertId, ...newUser });
    });
};

User.getOne = (userId, result) => {
    sql.query(`SELECT avatar, firstname, lastname, isAdmin FROM users WHERE id = ${userId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        } else if (res.length) {
            result(null, res[0]);
            return;
        }
    });
};

module.exports = User;
