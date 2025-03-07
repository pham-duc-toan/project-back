const md5 = require("md5");

const Account = require("../../models/account.model");

const system = require("../../config/system");
const { generateRandomString } = require("../../helpers/generate");
// [GET] /admin/my-account/
module.exports.index = async (req, res) => {
  try {
    res.render("admin/page/my-account/index", {
      pageTitle: "Thông tin cá nhân",
    });
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};

// [GET] /admin/my-account/edit
module.exports.edit = async (req, res) => {
  try {
    res.render("admin/page/my-account/edit", {
      pageTitle: "Chỉnh sửa thông tin cá nhân",
    });
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};

// [PATCH] /admin/my-account/edit
module.exports.editPatch = async (req, res) => {
  try {
    if (req.body.password) {
      req.body.password = md5(req.body.password);
      req.body.token = generateRandomString(30);
    } else {
      delete req.body.password;
    }

    await Account.updateOne({ _id: res.locals.user.id }, req.body);

    res.redirect(`/${system.prefixAdmin}/my-account`);
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};
