const express = require("express");
const router = express.Router();
const {
  getAllRecipes,
  getRecipeById,
  getMyRecipes,
  getFavorites,
  addFavorite,
  deleteFavorite,
  addRecipe,
} = require("../../controllers/recipesCtrl");
const { isValidId, upload, isFileUpload } = require("../../middlewares/");
const authenticate = require("../../middlewares/authenticate");

router.use(authenticate); // middleware that authenticate user by token, applies for any routs below

router.get("/", getAllRecipes);

// upload.array("preview", 3) - can add 3 files to field 'preview'
// uoload.fields([{name: "preview", maxCount: 3}, {name: "thumb", maxCount: 2}]) - can add 3 files to field 'preview' & 2 files - to field 'thumb'
router.post("/", upload.single("preview"), isFileUpload, addRecipe);

router.get("/favorites", getFavorites);

router.post("/favorites/:id", addFavorite);

router.put("/favorites/:id", deleteFavorite);

router.get("/my-recipes", getMyRecipes);

router.get("/:id", isValidId, getRecipeById);

module.exports = router;
