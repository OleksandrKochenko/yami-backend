const Category = require("../models/category");

const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().sort({ name: 1 }); //  value '1' sorts in ascending order, value '-1' sorts in descending
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

// learning stuff below, does not used in app
const getCategoriesForLearning = async (req, res, next) => {
  try {
    // const requestParams = req.query // object with all request parameters (example: <requestURL>/?favorite=true&page=1 : {favorite: true, page: 1})
    const { page, limit, ...query } = req.query; // destructurise page, limit and the rest of query parameters
    const skip = (page - 1) * limit; // calculate value of 'skip' for mongo pagination
    const ordinarySerchCategories = await Category.find(
      { ...query }, // gets documents that match all query params if they exist
      "-createdAt -updatedAt", // returns all categories without fields "createdAt" & "updatedAt"
      { skip, limit } // returns categories according to request params skip & limit
    )
      .collation({ locale: "en", strength: 2 }) // allows case insensitive matching
      .populate("owner", "email name"); // returns pupulated user data (_id, email & name) to field 'owner'

    const total = await Category.countDocuments(); // returns length of categories array (quantity of all categories)
    const advancedSearchCategories = await Category.find({
      name: { $regex: query.name }, // search if name field contain the value (not fully match)
    }).collation({ locale: "en", strength: 2 }); // case insensitive does not work on partially matching (containing);

    // returns documents that contain query value at field 'name' with case insensitive
    const regex = new RegExp(`.*${query.name}.*`, "i");
    const moreAdvancedSearchCategories = await Category.find({
      name: regex,
    });

    res.json({
      total,
      regex: { flags: regex.flags, value: regex.source }, // gets (log) the RegExp pattern and flags
      advancedSearchCategories,
      moreAdvancedSearchCategories,
      ordinarySerchCategories,
    });
  } catch (error) {
    next(error);
  }
};

const addCategory = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const result = await Category.create({ ...req.body, owner });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCategories,
  addCategory,
  getCategoriesForLearning,
};
