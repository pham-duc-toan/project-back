const User = require("../../models/user.model");
// [GET] /admin/users
module.exports.index = async (req, res) => {
  const records = await User.find({
    deleted: false,
  });
  res.render("admin/page/user/index", {
    pageTitle: "Danh sách tài khoản",
    records: records,
  });
};
