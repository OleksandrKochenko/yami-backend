const express = require("express");
const router = express.Router();

const {
  getAllCategories,
  addCategory,
} = require("../../controllers/categoriesCtrl");
const authenticate = require("../../middlewares/authenticate");

router.use(authenticate); // middleware that authentikate user by token, applies for any routs below

router.get("/", getAllCategories);

router.post("/", addCategory);

router.get("/:id", (req, res) => {
  res.json(categories[0]);
});

module.exports = router;
