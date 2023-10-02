const express = require("express");
const router = express.Router();
const {
  getAllRecipes,
  getRecipeById,
  getManyRecipesByIds,
  getMyRecipes,
} = require("../../controllers/recipesCtrl");
const { isValidId } = require("../../middlewares/");
const authenticate = require("../../middlewares/authenticate");

router.get("/", getAllRecipes);

router.get("/favorites", getManyRecipesByIds);

router.get("/myRecipes", authenticate, getMyRecipes);

router.get("/:id", isValidId, getRecipeById);

module.exports = router;
