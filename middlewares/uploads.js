const multer = require("multer");

const path = require("path");

const destination = path.resolve("temp"); // defines folder to upload files from http requests: /temp

const storage = multer.diskStorage({
  destination,
  filename: (req, file, cb) => {
    // creates new unique file name for storing at temp folder
    const uniquePreffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const { originalname } = file;
    const filename = `${uniquePreffix}_${originalname}`;
    cb(null, filename);
  },
});

const upload = multer({ storage });

module.exports = upload;
