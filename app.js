const express = require("express");
const cors = require("cors");
const logger = require("morgan");

const categoriesRouter = require("./routes/api/categories");

const app = express(); // creates web-server

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(logger(formatsLogger)); // logging to console on requests

app.use(cors()); // to available cross-domain requests (CORS)

app.use("/api/categories", categoriesRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" }); // send json data instead of html when path not found (not exist)
});

// errors handler of express
app.use((err, req, res, next) => {
  const { status = 500, message } = err;
  res.status(status).json({ message });
});

module.exports = app;
