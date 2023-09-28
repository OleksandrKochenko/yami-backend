const express = require("express");
const router = express.Router();

const {
  getAllCategories,
  addCategory,
} = require("../../controllers/categoriesCtrl");

router.get("/", getAllCategories);

router.post("/", addCategory);

router.get("/:id", (req, res) => {
  res.json(categories[0]);
});

module.exports = router;
