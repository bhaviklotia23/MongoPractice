const catchAsyncError = require("../../middleware/catchAsyncError");
const Category = require("../Category/category.model");
const Subcategory = require("../SubCategory/subcategory.model");
const postModel = require("./post.model");
const { PostDataService } = require("./post.service");

// exports.createPost = catchAsyncError(async (req, res) => {
//     const category = await Category.findById(req.body.category)
//     if(!category){
//         return res.status(404).json({ error: "Category not found" });
//     }
//     const data = await PostDataService(req.body, `uploads/${req.file.filename}`);
//     if(!data){
//         return res.status(422).json({ error: "Please add required fields" });
//     }
//     res.status(201).json({
//         message: "Post Created Successfully",
//         success: true,
//         data,
//       });
//   });

exports.createPost = catchAsyncError(async (req, res) => {
  const {
    name,
    type,
    colour,
    material_type,
    brand,
    product_code,
    size,
    shape,
    storage_capacity,
    moq,
    unit,
    certificate,
    advance_payment,
    credit_payment,
    hsn,
    gst,
    delivery_within_state,
    delivery_outside_state,
  } = req.body;
  const category = await Category.findById(req.body.category);
  if (!category) {
    return res.status(404).json({ error: "Category not found" });
  }

  const post = new postModel({
    images: `uploads/${req.file.filename}`,
    name,
    type,
    category: category._id,
    colour,
    material_type,
    brand,
    product_code,
    size,
    shape,
    storage_capacity,
    moq,
    unit,
    certificate,
    advance_payment,
    credit_payment,
    hsn,
    gst,
    delivery_within_state,
    delivery_outside_state,
  });

  try {
    const data = await post.save();
    console.log(data, "data");
    const result = await postModel.aggregate([
      {
        $match: { _id: data._id },
      },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "categoryData",
        },
      },
      {
        $unwind: "$categoryData",
      },
      {
        $project: {
          _id: 1,
          images: 1,
          name: 1,
          type: 1,
          categoryData: {
            name: 1,
            _id: 1,
          },
          colour: 1,
          material_type: 1,
          brand: 1,
          product_code: 1,
          size: 1,
          shape: 1,
          storage_capacity: 1,
          moq: 1,
          unit: 1,
          certificate: 1,
          advance_payment: 1,
          credit_payment: 1,
          hsn: 1,
          gst: 1,
          delivery_within_state: 1,
          delivery_outside_state: 1,
        },
      },
    ]);

    console.log(result, "result");

    if (!result || result.length === 0) {
      return res.status(500).json({ error: "Failed to retrieve post data" });
    }

    res.status(201).json({
      message: "Post Created Successfully",
      success: true,
      data: result[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// exports.createPost = catchAsyncError(async (req, res) => {
//   const { category, payload } = req.body;
// //   console.log(category, ...payload, '9999');

//   try {
//     const categoryData = await Category.findById(category);
//     if (!categoryData) {
//       return res.status(404).json({ error: "Category not found" });
//     }

//     const postData = {
//       category: categoryData,
//       payload,
//     };

//     const data = await PostDataService(
//       postData,
//       `uploads/${req.file.filename}`
//     );
//     if (!data) {
//       return res.status(422).json({ error: "Please add required fields" });
//     }
//     res.status(201).json({
//       message: "Post Created Successfully",
//       success: true,
//       data,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server Error", error: error.message });
//   }
// });
