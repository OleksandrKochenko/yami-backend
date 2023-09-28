const Category = require("../models/category");

const getAllCategories = async (req, res, next) => {
  try {
    const result = await Category.find();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const addCategory = async (req, res, next) => {
  try {
    const result = await Category.create(req.body);
    console.log("body", req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCategories,
  addCategory,
};
