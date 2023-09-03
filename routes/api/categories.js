const express = require("express");
const router = express.Router();

const categories = require("../../categories");

router.get("/", (req, res) => {
  res.json(categories);
});

router.get("/:id", (req, res) => {
  res.json(categories[0]);
});

module.exports = router;
