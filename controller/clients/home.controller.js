// [GET] /
module.exports.index = async (req, res) => {
    res.render("clients/page/home/index", {
      pageTitle: "Trang chủ"
    });
  }