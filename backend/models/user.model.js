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

User.login = (emailLogin, result) => {
    sql.query("SELECT * FROM users WHERE email = ? ", emailLogin, (err, res) => {
        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }
    });
};

User.findOne = (userId, result) => {
    sql.query("SELECT * FROM users WHERE id = ? ", userId, (err, res) => {
        if (err) {
            console.log("error : ", err);
            result(null, err);
            return;
        }
        result(null, res);
    });
};
module.exports = User;
