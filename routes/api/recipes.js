const express = require("express");
const router = express.Router();
const {
  getAllRecipes,
  getRecipeById,
  getManyRecipesByIds,
  getMyRecipes,
  getFavorites,
  addFavorite,
  deleteFavorite,
} = require("../../controllers/recipesCtrl");
const { isValidId } = require("../../middlewares/");
const authenticate = require("../../middlewares/authenticate");

router.use(authenticate); // middleware that authenticate user by token, applies for any routs below

router.get("/", getAllRecipes);

router.get("/favorites", getFavorites);

router.post("/favorites/:id", addFavorite);

router.put("/favorites/:id", deleteFavorite);

router.get("/my-recipes", getMyRecipes);

router.get("/:id", isValidId, getRecipeById);

module.exports = router;
