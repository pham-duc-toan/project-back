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