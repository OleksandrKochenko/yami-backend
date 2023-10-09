const express = require("express");
const cors = require("cors");
const logger = require("morgan");
require("dotenv").config();

const categoriesRouter = require("./routes/api/categories");
const recipesRouter = require("./routes/api/recipes");
const authRouter = require("./routes/auth/auth");
const frontPageRouter = require("./routes/api/frontPage");
const ingredientsRouter = require("./routes/api/ingredients");

const app = express(); // creates web-server

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(logger(formatsLogger)); // logging to console on requests

app.use(cors()); // to available cross-domain requests (CORS)

app.use(express.json()); // sets body parser to req.body

app.use(express.static("public")); // allows to get static files from folder "public"

app.use("/auth", authRouter);

app.use("/api/categories", categoriesRouter);

app.use("/api/recipes", recipesRouter);

app.use("/api/front-page", frontPageRouter);

app.use("/api/ingredients", ingredientsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" }); // send json data instead of html when path not found (not exist)
});

// errors handler of express
app.use((err, req, res, next) => {
  const { status = 500, message } = err;
  res.status(status).json({ message });
});

module.exports = app;
