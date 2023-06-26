const express = require("express");
const { getSubCategoryById } = require("./subcategory.controller");

const router = express.Router();

router.get("/subcategories/:id", getSubCategoryById);

module.exports = router;
