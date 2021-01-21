sql = require("./db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
    }); //'?' in the query replaces dynamic content (it sets what the user posts)
};

/*User.login = (user, result) => {
    sql.query("SELECT * from users WHERE email = ? ", user, (err, res) => {
        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }
        console.log(result);
    });
};*/

/*User.findOne = (email, result) => {
    sql.query("SELECT * FROM users WHERE email = ?", (err, res) => {
        //if any problem occurs
        if (err) {
            console.log("error : ", err);
            result(err, null);
            return;
        }

        //if there is a result
        if (res.length) {
            console.log("user found: ", res[0]);
            result(null, res[0]);
            return;
        }

        //if there is no user with the email that's requested
        result({ kind: "not_found" }, null);
    });
};*/

module.exports = User;
