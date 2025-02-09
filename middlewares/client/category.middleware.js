const ProductCategory = require("../../models/product-category.model");

const createTree = require("../../helpers/createTree");

module.exports.category = async (req, res, next) => {
  try {
    const categoryProducts = await ProductCategory.find({
      deleted: false,
    });
    const newCategoryProducts = createTree(categoryProducts);

    res.locals.layoutCategoryProducts = newCategoryProducts;

    next();
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};
