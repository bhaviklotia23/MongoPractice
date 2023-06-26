const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const postSchema = new mongoose.Schema({
  images: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["Post_to_buy", "Post_to_sell", "Post_to_social"],
  },
  category: {
    type: ObjectId,
    ref: "Category",
    required: true
  },
  // subCategory: {
  //   type: ObjectId,
  //   ref: "Category",
  //   required: true
  // },
  colour: {
    type: String,
  },
  material_type: {
    type: String,
  },
  brand: {
    type: String,
  },
  product_code: {
    type: String,
  },
  size: {
    type: String,
  },
  shape: {
    type: String,
  },
  storage_capacity: {
    type: String,
  },
  moq: {
    type: String,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
  certificate: {
    type: String,
  },
  advance_payment: {
    type: String,
    required: true,
  },
  credit_payment: {
    type: String,
    required: true,
  },
  hsn: {
    type: String,
    required: true,
  },
  gst: {
    type: String,
    required: true,
  },
  delivery_within_state: {
    type: String,
  },
  delivery_outside_state: {
    type: String,
  },
});

module.exports = mongoose.model("Post", postSchema);
