const { HttpError } = require("../helpers");

const isFileUpload = (req, res, next) => {
  if (!req.file) {
    throw HttpError(400, "file upload is required");
  }
  next();
};

module.exports = isFileUpload;
