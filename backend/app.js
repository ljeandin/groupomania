const express = require("express"); //well, you knwo what that's for
const mysql = require("mysql"); //we'll use mysql
//const bodyParser = require("body-parser"); // body parser to read form input and storing it as JS object
//const path = require("path"); // path is used to make path manipulation easier

//Declaring routes

//Requiring dotenv (to hide mongoose connexion password and name -see right below)
require("dotenv").config();

//mySql connexion
var connection = mysql.createConnection({
    host: "localhost",
    user: process.env.NAME,
    password: process.env.PASSWORD,
    database: "groupomaniaDB.sql",
});

connection.connect();

connection.query("SELECT 1 + 1 AS solution", function (err, rows, fields) {
    if (err) throw err;

    console.log("The solution is: ", rows[0].solution);
});

connection.end();

//Using express
const app = express();

//headers for avoiding CORS problems
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
});

//using bodyParser
//app.use(bodyParser.json());

//path to images
app.use("/images", express.static(path.join(__dirname, "images")));

//path to sauces and authentication in the API
app.use("/api/sauces", sauceRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;
