const { HttpError } = require("../helpers");
const Recipe = require("../models/recipe");

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
    const result = await Recipe.findById(id);
    //const result = await Recipe.findOne({ _id: id }); // returns recipe with field '_id' equal 'id' from params (fits for any other fields)
    if (!result) {
      throw HttpError(404, `Recipe with id ${id} not found`);
    }
    res.json(result);
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
};
