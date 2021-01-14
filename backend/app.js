const express = require("express"); //well, you know what that's for
const bodyParser = require("body-parser"); // body parser to read form input and storing it as JS object
//const path = require("path"); // path is used to make path manipulation easier

//Declaring routes
const userRoutes = require("./routes/user.routes");

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
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.json({ message: "Welcome" });
});

//path to images
//app.use("/images", express.static(path.join(__dirname, "images")));

//path to use
app.use("/api", userRoutes);

module.exports = app;
