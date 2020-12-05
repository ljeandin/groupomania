//Server creation
const http = require("http"); //using http to transfer data over the Hyper Text Transfer Protocol
const app = require("./app"); //importing app.js file

/***Normalize a port to make sure the port provided is a number if not a number then a string and if anything else set it to false.***/
const normalizePort = (val) => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};

/***Setting the port to 3000 ***/
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

/***Error handling in case something malfunctions ***/
const errorHandler = (error) => {
    if (error.syscall !== "listen") {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === "string" ? "pipe " + address : "port: " + port;
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges.");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use.");
            process.exit(1);
            break;
        default:
            throw error;
    }
};

const server = http.createServer(app); // USing app.js to import the application's infos

server.on("error", errorHandler); //Error in case something goes wrong when starting the server
server.on("listening", () => {
    const address = server.address();
    const bind = typeof address === "string" ? "pipe " + address : "port " + port; //using the port that he server will run on
    console.log("Listening on " + bind); //confirmation message
});

server.listen(port); //server will listen on specified port
