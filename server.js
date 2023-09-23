const mongoose = require("mongoose");

const app = require("./app");

const DB_HOST =
  "mongodb+srv://Alex:KxGFqyEqva7I0aZK@cluster0.0ynnsv7.mongodb.net/recipes?retryWrites=true&w=majority";

mongoose
  .connect(DB_HOST) // connects to DB (MongoDB)
  .then(() => {
    app.listen(4000, () => console.log("Server running on port 4000 ")); // starts running server
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1); // closes all running processes
  });
