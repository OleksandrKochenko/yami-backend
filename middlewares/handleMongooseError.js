// handler of request error (invalid data of request)
const handleMongooseError = (err, data, next) => {
  const { code, name } = err;
  err.status = code === 11000 && name === "MongoServerError" ? 409 : 400;
  next();
};

module.exports = handleMongooseError;
