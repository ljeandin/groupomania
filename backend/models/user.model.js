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

//this function is to create a new account
User.signup = (newUser, result) => {
    //sets users infos to the user table
    sql.query("INSERT INTO users SET ? ", newUser, (err, res) => {
        if (err) {
            console.log("error :", err);
            result(err, null);
            return;
        }
        result(null, { id: res.insertId, ...newUser });
    });
};

//this function is to log into account
User.login = (email, password, result) => {
    //get all infos about the user that has the email
    sql.query(`SELECT * FROM users WHERE email = ?`, email, (err, res) => {
        //if the email does exist in the db
        if (res.length > 0) {
            //compare the given password to one in the db
            bcrypt.compare(password, res[0].password).then((valid) => {
                // if it doesn't match, throw error
                if (!valid) {
                    console.log("error :", err);
                    result(err, null);
                    return;
                } else {
                    //if it matches, send the infos and create auth token
                    result(null, {
                        userId: res[0].id,
                        email: res[0].email,
                        token: jwt.sign({ userId: res[0].id }, "RANDOM_TOKEN_SECRET", { expiresIn: "24h" }),
                    });
                }
            });
        } else {
            // if the email doesn't match, throw error
            console.log("error :", err);
            result(err, null);
            return;
        }
    });
};

//this function retrieves some infos of a single user
User.getOne = (userId, result) => {
    //retrieves infos for the user whse id is provided
    sql.query(`SELECT id, avatar, firstname, lastname, isAdmin FROM users WHERE id = ${userId}`, (err, res) => {
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

//this is for changing the avatar
User.changeAvatar = (avatar, userId, result) => {
    //changing the avatar for the provided one for the provided user id
    sql.query(`UPDATE users SET avatar = '${avatar}' WHERE id = ${userId}`, (err, res) => {
        if (err) {
            console.log("error :", err);
            result(err, null);
            return;
        } else {
            result(null, res[0]);
            return;
        }
    });
};

//this is for deleting the account of a user
User.deleteAccount = (userId, result) => {
    //deleting the account of the user whose id is provided
    sql.query(`DELETE FROM users WHERE users.id = ${userId}`, (err, res) => {
        if (err) {
            console.log("error :", err);
            result(err, null);
            return;
        } else {
            result(null, res[0]);
            return;
        }
    });
};

module.exports = User;
