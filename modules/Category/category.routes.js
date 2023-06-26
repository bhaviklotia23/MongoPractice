const express = require("express");
const { getAllCategories } = require("./category.controller");

  const router = express.Router();

  router.route("/categories").get(getAllCategories);

  module.exports = router;