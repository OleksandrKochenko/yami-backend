const mongoose = require("mongoose");

const app = require("./app");

const { DB_HOST } = require("./config");

mongoose
  .connect(DB_HOST) // connects to DB (MongoDB)
  .then(() => {
    app.listen(4000, () => console.log("Server running on port 4000 ")); // starts running server
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1); // closes all running processes
  });
