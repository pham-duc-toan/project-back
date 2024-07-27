const Product = require("../../models/product.model");

const productsHelper = require("../../helpers/products");
// [GET] /
module.exports.index = async (req, res) => {
  try {
    // Hiển thị danh sách sản phẩm nổi bật
    const productsFeatured = await Product.find({
      featured: "1",
      deleted: false,
      status: "active",
    })
      .sort({ position: "desc" })
      .limit(6);

    const newProductsFeatured =
      productsHelper.priceNewProducts(productsFeatured);
    // Hết Hiển thị danh sách sản phẩm nổi bật
    // Hiển thị danh sách sản phẩm mới nhất
    const productsNew = await Product.find({
      deleted: false,
      status: "active",
    })
      .sort({ position: "desc" })
      .limit(6);

    const newProductsNew = productsHelper.priceNewProducts(productsNew);
    // Hết Hiển thị danh sách sản phẩm mới nhất

    res.render("clients/page/home/index", {
      pageTitle: "Trang chủ",
      productsFeatured: newProductsFeatured,
      productsNew: newProductsNew,
    });
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};
