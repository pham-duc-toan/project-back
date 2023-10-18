const Product = require("../../models/product.model");

const productsHelper = require("../../helpers/products");
// [GET] /
module.exports.index = async (req, res) => {
    // Hiển thị danh sách sản phẩm nổi bật
    const productsFeatured = await Product.find({
      featured: "1",
      deleted: false,
      status: "active"
    }).limit(6);

    const newProductsFeatured = productsHelper.priceNewProducts(productsFeatured);
    // Hết Hiển thị danh sách sản phẩm nổi bật
    res.render("clients/page/home/index", {
      pageTitle: "Trang chủ",
      productsFeatured: newProductsFeatured
   
   
    });
  }