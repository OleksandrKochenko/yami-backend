const Category = require("../models/category");

const getAllCategories = async (req, res, next) => {
  try {
    // const requestParams = req.query // object with all request parameters (example: <requestURL>/?favorite=true&page=1 : {favorite: true, page: 1})
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    const categories = await Category.find({}, "-createdAt -updatedAt", {
      skip,
      limit,
    }) // returns all categories without fields "createdAt" & "updatedAt" according to request params skip & limit
      .populate("owner", "email name"); // returns pupulated user data (_id, email & name) to field 'owner'

    const total = await Category.find().countDocuments(); // returns length of categories array (quantity of all categories)

    res.json({ total, categories });
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
};
