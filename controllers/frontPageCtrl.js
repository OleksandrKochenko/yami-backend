const Category = require("../models/category");
const Recipe = require("../models/recipe");

const getFrontPage = async (req, res, next) => {
  try {
    const randomCategories = await Category.aggregate([
      { $sample: { size: 4 } },
    ]);
    const randomCategoriesArray = randomCategories.map(
      (category) => category.name
    );

    const randomRecipes0 = await Recipe.aggregate([
      {
        $match: { category: randomCategoriesArray[0] },
      },
      { $sample: { size: 4 } },
    ]);

    const randomRecipes1 = await Recipe.aggregate([
      {
        $match: { category: randomCategoriesArray[1] },
      },
      { $sample: { size: 4 } },
    ]);

    const randomRecipes2 = await Recipe.aggregate([
      {
        $match: { category: randomCategoriesArray[2] },
      },
      { $sample: { size: 4 } },
    ]);

    const randomRecipes3 = await Recipe.aggregate([
      {
        $match: { category: randomCategoriesArray[3] },
      },
      { $sample: { size: 4 } },
    ]);

    res.json({
      randomRecipes0,
      randomRecipes1,
      randomRecipes2,
      randomRecipes3,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getFrontPage,
};
