const { HttpError } = require("../helpers");
const Recipe = require("../models/recipe");

const getAllRecipes = async (req, res, next) => {
  try {
    const result = await Recipe.find();
    // const result = await Recipe.find({}, 'title category'); // returns all recipes only with fields 'title' and 'category'
    // const result = await Recipe.find({}, '-area -youtube'); // returns all recipes without fields 'area' and 'youtube'
    res.json(result);
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

module.exports = {
  getAllRecipes,
  getRecipeById,
};
