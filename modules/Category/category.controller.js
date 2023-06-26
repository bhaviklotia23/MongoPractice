const catchAsyncError = require("../../middleware/catchAsyncError");
const Category = require("./category.model");

exports.getAllCategories = catchAsyncError(async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
