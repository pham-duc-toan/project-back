const Product = require("../../models/product.model")
// [GET] /products

module.exports.index = async (req, res) => {
  
  const products = await Product.find({
    status: "active",
    deleted: false
  }).sort({ position: "desc" });; 
  const productsNew = await products.map (item =>{
    item.priceNew= Math.round(item.price*(100 - item.discountPercentage)/100);
    return item;
  })
    res.render("clients/page/products/index", {
      pageTitle: "Danh sách sản phẩm",
      products: productsNew
    });
  }