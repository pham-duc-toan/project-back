module.exports.index = (req, res) => {
    res.render("clients/page/products/index", {
      pageTitle: "Danh sách sản phẩm"
    });
  }