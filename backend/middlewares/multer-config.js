const multer = require("multer");

const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/gif": "gif",
};

//this is the multer middleware for posts images
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "images");
    },
    //defining filename to make sure there's no double
    filename: (req, file, callback) => {
        const name = file.originalname.split(" ").join("_"); //Replacing whitespace with underscores in the name
        const extension = MIME_TYPES[file.mimetype]; //Declaring the extension
        callback(null, name + Date.now() + "." + extension); //Creating full filename with name + date + extension
    },
});

module.exports = multer({ storage }).single("image");
