// [GET] /admin/dashboard
module.exports.dashboard = (req, res) => {
    res.render("admin/page/dashboard/index", {
      pageTitle: "Tổng quan"
    });
  }