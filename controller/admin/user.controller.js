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
// [PATCH] /admin/users/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  try {
    await User.updateOne(
      { _id: req.params.id },
      {
        status: req.params.status,
      }
    );
    res.redirect("back");
  } catch (error) {
    res.redirect("back");
    console.log(error);
  }
};
// [DELETE] /admin/users/delete/:id
module.exports.deleteItem = async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id });
    res.redirect("back");
  } catch (error) {
    res.redirect("back");
    console.log(error);
  }
};
// [GET] /admin/users/detail/:id
module.exports.detail = async (req, res) => {
  try {
    const item = await User.findOne({
      _id: req.params.id,
    }).select("-password -tokenUser");
    for (const friend of item.listFriend) {
      const friendInfo = await User.findOne({
        _id: friend.friend_id,
      }).select("fullName avatar id");
      friend.friendInfo = friendInfo;
    }
    res.render("admin/page/user/detail", {
      pageTitle: "Chi tiết khách hàng",
      item: item,
    });
  } catch (error) {
    res.redirect("back");
    console.log(error);
  }
};
