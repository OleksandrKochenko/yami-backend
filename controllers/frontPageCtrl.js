const Category = require("../models/category");
const Recipe = require("../models/recipe");

const getFrontPage = async (req, res, next) => {
  try {
    const randomCategories = await Category.aggregate([
      { $sample: { size: 4 } },
    ]);

    const [c1, c2, c3, c4] = randomCategories;

    const specifiedFields = {
      title: 1,
      category: 1,
      instructions: 1,
      description: 1,
      thumb: 1,
      preview: 1,
      time: 1,
    };

    const randomRecipes1 = await Recipe.aggregate([
      {
        $match: { category: c1.name },
      },
      { $sample: { size: 4 } },
      {
        $project: specifiedFields,
      },
    ]);

    const randomRecipes2 = await Recipe.aggregate([
      {
        $match: { category: c2.name },
      },
      { $sample: { size: 4 } },
      {
        $project: specifiedFields,
      },
    ]);

    const randomRecipes3 = await Recipe.aggregate([
      {
        $match: { category: c3.name },
      },
      { $sample: { size: 4 } },
      {
        $project: specifiedFields,
      },
    ]);

    const randomRecipes4 = await Recipe.aggregate([
      {
        $match: { category: c4.name },
      },
      { $sample: { size: 4 } },
    ]);

    const result = [
      { category: c1, recipes: randomRecipes1 },
      { category: c2, recipes: randomRecipes2 },
      { category: c3, recipes: randomRecipes3 },
      { category: c4, recipes: randomRecipes4 },
    ];

    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getFrontPage,
};
