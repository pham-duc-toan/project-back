const md5 = require("md5");
const Account = require("../../models/account.model");

const systemConfig = require("../../config/system");

// [GET] /admin/auth/login
module.exports.login = async (req, res) => {
  try {
    res.render("admin/page/auth/login", {
      pageTitle: "Đăng nhập",
    });
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};

// [POST] /admin/auth/login
module.exports.loginPost = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await Account.findOne({
      email: email,
      deleted: false,
    });

    if (!user) {
      req.flash("error", "Email không tồn tại!");
      res.redirect("back");
      return;
    }

    if (md5(password) != user.password) {
      req.flash("error", "Sai mật khẩu!");
      res.redirect("back");
      return;
    }

    if (user.status == "inactive") {
      req.flash("error", "Tài khoản đang bị khóa!");
      res.redirect("back");
      return;
    }

    res.cookie("token", user.token);
    res.redirect(`/${systemConfig.prefixAdmin}/dashboard`);
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};

// [GET] /admin/auth/logout
module.exports.logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.redirect(`/${systemConfig.prefixAdmin}/auth/login`);
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};
