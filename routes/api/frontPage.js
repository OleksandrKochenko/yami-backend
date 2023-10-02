const express = require("express");
const router = express.Router();

const { getFrontPage } = require("../../controllers/frontPageCtrl");

router.get("/", getFrontPage);

module.exports = router;
