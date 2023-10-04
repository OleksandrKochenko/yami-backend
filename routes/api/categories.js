const express = require("express");
const router = express.Router();

const {
  getAllCategories,
  addCategory,
  getCategoriesForLearning,
} = require("../../controllers/categoriesCtrl");
const authenticate = require("../../middlewares/authenticate");

router.use(authenticate); // middleware that authenticate user by token, applies for any routs below

router.get("/", getAllCategories);

// learning stuff below, does not used in app

router.get("/learn", getCategoriesForLearning);

router.post("/", addCategory);

module.exports = router;
