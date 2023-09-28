const express = require("express");
const router = express.Router();
const {
  getAllRecipes,
  getRecipeById,
} = require("../../controllers/recipesCtrl");
const { isValidId } = require("../../middlewares/");

router.get("/", getAllRecipes);

router.get("/:id", isValidId, getRecipeById);

module.exports = router;
