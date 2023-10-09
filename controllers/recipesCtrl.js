const sharp = require("sharp");
const { HttpError, cloudinary } = require("../helpers");
const Recipe = require("../models/recipe");

const fs = require("fs/promises");
const path = require("path");

const getAllRecipes = async (req, res, next) => {
  try {
    const { page = 1, limit = 8, category, title, ingredient } = req.query;
    const skip = (page - 1) * limit;
    const regex = new RegExp(`.*${title}.*`, "i");

    const recipes = await Recipe.find(
      {
        $or: [{ title: regex }, { category }, { "ingredients.id": ingredient }], // different rules for search depends on query params
      },
      "",
      {
        skip,
        limit,
      }
    );
    // const result = await Recipe.find({}, 'title category'); // returns all recipes only with fields 'title' and 'category'
    // const result = await Recipe.find({}, '-area -youtube'); // returns all recipes without fields 'area' and 'youtube'
    res.json({ regex: { value: regex.source }, recipes });
  } catch (error) {
    next(error);
  }
};

const getRecipeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findById(id);
    //const result = await Recipe.findOne({ _id: id }); // returns recipe with field '_id' equal 'id' from params (fits for any other fields)
    if (!recipe) {
      throw HttpError(404, `Recipe with id ${id} not found`);
    }
    res.json(recipe);
  } catch (error) {
    next(error);
  }
};

const addRecipe = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { path: oldPath, filename } = req.file;

    const newPath = oldPath.replace(/\.[^/.]+$/, "") + ".webp";
    await sharp(oldPath).webp({ quality: 60 }).toFile(newPath);

    const fileData = await cloudinary.uploader.upload(newPath, {
      folder: "recipes",
    });
    const preview = fileData.url;
    const insertIdx = preview.indexOf("upload/");
    // creats url for compressed preview img
    const thumb =
      preview.slice(0, insertIdx) +
      "upload/q_30/" +
      preview.slice(insertIdx + 7);

    await fs.unlink(oldPath); // deletes uplouded file from 'temp' folder
    await fs.unlink(newPath);

    // stuff to save uploaded files to public folder:
    /* const moviesDir = path.resolve("public", "recipes");
    const newPath = path.join(moviesDir, filename);
    fs.rename(oldPath, newPath);
    const preview = path.join("recipes", filename); */

    const recipe = await Recipe.create({
      ...req.body,
      preview,
      thumb,
      owner,
    });
    res.json(recipe);
  } catch (error) {
    next(error);
  }
};

const getMyRecipes = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { page = 2, limit = 1 } = req.query;
    const skip = (page - 1) * limit;
    const result = await Recipe.find({ owner }, "", {
      skip,
      limit,
    }).populate("owner", "name email");
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getFavorites = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { page = 1, limit = 8 } = req.query;
    const skip = (page - 1) * limit;
    const recipes = await Recipe.find({ favorite: { $in: [_id] } }, "", {
      skip,
      limit,
    });
    res.json(recipes);
  } catch (error) {
    next(error);
  }
};

const addFavorite = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    const { id: recipeId } = req.params;

    const recipe = await Recipe.findById(recipeId);
    if (!recipe) throw HttpError(404, `Recipe with id ${recipeId} not found`);

    const alreadyFavoriteRecipe = await Recipe.findOne({
      _id: recipeId,
      favorite: { $in: userId },
    });
    if (alreadyFavoriteRecipe)
      throw HttpError(409, `Recipe with id ${recipeId} already in favorite`);

    await Recipe.findByIdAndUpdate(
      { _id: recipeId },
      { $push: { favorite: userId } }
    );
    res.json({
      message: `Recipe with id ${recipeId} added to favorites by user with id ${userId}`,
    });
  } catch (error) {
    next(error);
  }
};

const deleteFavorite = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    const { id: recipeId } = req.params;

    const recipe = await Recipe.findById(recipeId);
    if (!recipe) throw HttpError(404, `Recipe with id ${recipeId} not found`);

    await Recipe.findByIdAndUpdate(
      { _id: recipeId },
      { $pull: { favorite: { $in: [userId] } } }
    );
    res.json({
      message: `Recipe with id ${recipeId} removed from favorites of user with id ${userId}`,
    });
  } catch (error) {
    next(error);
  }
};

// learning stuff below, does not used in app
// gets recipes by array of ids.
const getManyRecipesByIds = async (req, res, next) => {
  try {
    const { idsArray } = req.body; // Source of ids should be changed from body to user's favorite recipes array of ids
    const result = await Recipe.find({ _id: { $in: idsArray } });
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllRecipes,
  getRecipeById,
  getFavorites,
  getMyRecipes,
  getManyRecipesByIds,
  addFavorite,
  deleteFavorite,
  addRecipe,
};
