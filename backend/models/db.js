const mysql = require("mysql2");

//Requiring dotenv (to hide mySQL connexion password and name -see right below)
require("dotenv").config();

//mySql connexion
var connection = mysql.createConnection({
    host: "localhost",
    user: process.env.NAME,
    password: process.env.PASSWORD,
    database: "groupomaniadb",
});

connection.connect();

//if the connection is established, the console will print "The solution is : 2"
connection.query("SELECT 1 + 1 AS solution", function (err, rows, fields) {
    if (err) throw err;

    console.log("The solution is: ", rows[0].solution);
});
module.exports = connection;
