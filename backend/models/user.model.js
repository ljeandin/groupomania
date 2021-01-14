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

        console.log("users: ", res);
        result(null, res);
    });
};

/*sql.query(
    "SELECT id as 'user.id', avatar as 'user.avatar', firstname as 'user.firstname', lastname as 'user.lastname', email as 'user.email', password as 'user.password', isAdmin as 'user.isAdmin' FROM users",
    function (err, result) {
        if (err) throw err;

        console.log(result);
    }
);*/

/*sql.query("SELECT firstname FROM users WHERE id=1", function (err, result) {
    if (err) throw err;

    console.log(result);
});*/
module.exports = User;
