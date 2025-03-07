const Product = require("../../models/product.model");
const ProductCategory = require("../../models/product-category.model");

const productsHelper = require("../../helpers/products");
// [GET] /products

module.exports.index = async (req, res) => {
  try {
    const products = await Product.find({
      status: "active",
      deleted: false,
    }).sort({ position: "desc" });
    const newProducts = productsHelper.priceNewProducts(products);
    res.render("clients/page/products/index", {
      pageTitle: "Danh sách sản phẩm",
      products: newProducts,
    });
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};

// [GET] /products/:slugCategory
module.exports.category = async (req, res) => {
  const slugCategory = req.params.slugCategory;

  const category = await ProductCategory.findOne({
    slug: slugCategory,
    deleted: false,
    status: "active",
  });

  const products = await Product.find({
    product_category_id: category.id,
    status: "active",
    deleted: false,
  }).sort({ position: "desc" });

  const newProducts = productsHelper.priceNewProducts(products);

  res.render("clients/page/products/index", {
    pageTitle: "Danh sách sản phẩm",
    products: newProducts,
  });
};

// [GET] /products/detail/:slugProduct
module.exports.detail = async (req, res) => {
  try {
    const slug = req.params.slugProduct;
    var product;
    if (slug == "undefined") {
      res.redirect("back");
    } else {
      product = await Product.findOne({
        deleted: false,
        slug: slug,
        status: "active",
      });
      if (product.product_category_id) {
        const category = await ProductCategory.findOne({
          _id: product.product_category_id,
          deleted: false,
          status: "active",
        });

        product.category = category;
      }

      product.priceNew = productsHelper.priceNewProduct(product);
    }
    res.render("clients/page/products/detail", {
      pageTitle: "Chi tiết sản phẩm",
      product: product,
    });
  } catch (error) {
    res.redirect("/");
  }
};
