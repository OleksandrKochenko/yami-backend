const express = require("express");
const getAllIngredients = require("../../controllers/ingredientsCtrl");
const router = express.Router();

router.get("/", getAllIngredients);

module.exports = router;
