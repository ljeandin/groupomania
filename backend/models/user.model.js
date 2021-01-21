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

module.exports = User;
