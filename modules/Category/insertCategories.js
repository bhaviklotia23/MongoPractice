const Category = require("./category.model");
const categoriesData = require('./categories.json')
const subcategoriesData = require('../SubCategory/subcategories.json');
const Subcategory = require("../SubCategory/subcategory.model");


exports.insertCategories = () => {
    return Category.insertMany(categoriesData);
  }

  exports.insertSubcategories = () => {
    // Map category names to their respective _id values
    const categoryMap = {};
  
    return Category.find()
      .then((categories) => {
        categories.forEach((category) => {
          categoryMap[category.name] = category._id;
        });
  
        // Create subcategories with mapped category _id values
        const subcategoriesToInsert = subcategoriesData.map((subcategory) => ({
          name: subcategory.name,
          category: categoryMap[subcategory.category],
          status: subcategory.status,
        }));
  
        return Subcategory.insertMany(subcategoriesToInsert);
      })};
  