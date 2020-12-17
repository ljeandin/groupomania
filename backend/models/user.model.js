sql = require("./db.js");

// constructor
const User = function (user) {
    this.id = users.id;
    this.avatar = user.avatar;
    this.firstname = users.firstname;
    this.lastname = users.lastname;
    this.email = users.email;
    this.password = users.password;
    this.isAdmin = users.isAdmin;
};

User.getAll = (result) => {
    sql.query("SELECT * FROM users", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("users: ", res);
        result(null, res);
    });
};

module.exports = User;
