const Ingredient = require("../models/ingredient");

const getAllIngredients = async (req, res, next) => {
  try {
    const ingredients = await Ingredient.find();
    res.json(ingredients);
  } catch (error) {
    next(error);
  }
};

module.exports = getAllIngredients;
