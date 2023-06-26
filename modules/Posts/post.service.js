const Post = require("./post.model");

exports.PostDataService = async (payload, images) => {
  try {
    return await Post.create({ images, ...payload });
  } catch (err) {
    throw err;
  }
};