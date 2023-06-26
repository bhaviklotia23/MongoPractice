const catchAsyncError = require("../../middleware/catchAsyncError");
const Subcategory = require("./subcategory.model");
const Category = require("../Category/category.model");

// exports.getSubCategoryById = catchAsyncError(async (req, res) => {
//   try {
//     const categoryId = req.params.id;

//     const category = await Category.findById(categoryId);
//     if (!category) {
//       return res.status(404).json({ message: "Category not found" });
//     }
//     const subcategories = await Subcategory.find({ category: categoryId });

//     res.json(subcategories);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// });

exports.getSubCategoryById = catchAsyncError(async (req, res) => {
  try {
    const categoryId = req.params.id;

    const category = await Category.findById(categoryId);
    console.log(category, "category");
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const subcategories = await Subcategory.aggregate([
      {
        $match: { category: category._id },
      },
      {
        $lookup: {
          from: "categories", // The name of the Category collection
          localField: "category",
          foreignField: "_id",
          as: "categoryData",
        },
      },
      {
        $unwind: "$categoryData", // It will return data of category in object rather than array
      },
      {
        $project: {
          _id: 1,
          name: 1,
          categoryData: 1,
        },
      },
    ]);

    res.json(subcategories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

