const Product = require("../../models/product.model");
const productsHelper = require("../../helpers/products");
// [GET] /products

module.exports.index = async (req, res) => {
  
  const products = await Product.find({
    status: "active",
    deleted: false
  }).sort({ position: "desc" });
  const newProducts = productsHelper.priceNewProducts(products);
    res.render("clients/page/products/index", {
      pageTitle: "Danh sách sản phẩm",
      products: newProducts
    });
  }


// [GET] /products/detail/:slug
module.exports.detail = async (req, res) => {
  try {
    const slug = req.params.slug;
    var product;
    if(slug == "undefined"){
      res.redirect("back");
  
    }
    else {
        product = await Product.findOne({
        deleted: false,
        slug: slug,
        status: "active"
      });
    }
    res.render("clients/page/products/detail", {
      pageTitle: "Chi tiết sản phẩm",
      product: product
    });
  } catch (error) {
    res.redirect("/");
  }
}