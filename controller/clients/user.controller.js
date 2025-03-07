const md5 = require("md5");

const User = require("../../models/user.model");
const ForgotPassword = require("../../models/forgot-password.model");
const Cart = require("../../models/cart.model");

const generateHelper = require("../../helpers/generate");
const sendMailHelper = require("../../helpers/sendMail");
// [GET] /user/register
module.exports.register = async (req, res) => {
  try {
    res.render("clients/page/user/register", {
      pageTitle: "Đăng ký tài khoản",
    });
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};

// [POST] /user/register
module.exports.registerPost = async (req, res) => {
  try {
    const existEmail = await User.findOne({
      email: req.body.email,
      deleted: false,
    });

    if (existEmail) {
      req.flash("error", `Email đã tồn tại!`);
      res.redirect("back");
      return;
    }
    req.body.tokenUser = generateHelper.generateRandomString(30);
    req.body.password = md5(req.body.password);

    const user = new User(req.body);
    await user.save();

    res.cookie("tokenUser", user.tokenUser);

    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};
// [GET] /user/login
module.exports.login = async (req, res) => {
  try {
    res.render("clients/page/user/login", {
      pageTitle: "Đăng nhập tài khoản",
    });
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};

// [POST] /user/login
module.exports.loginPost = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({
      email: email,
      deleted: false,
    });

    if (!user) {
      req.flash("error", `Email không tồn tại!`);
      res.redirect("back");
      return;
    }

    if (md5(password) != user.password) {
      req.flash("error", `Sai mật khẩu!`);
      res.redirect("back");
      return;
    }

    if (user.status == "inactive") {
      req.flash("error", `Tài khoản đang bị khóa!`);
      res.redirect("back");
      return;
    }

    res.cookie("tokenUser", user.tokenUser);

    // Lưu user_id vào collection carts
    await Cart.updateOne(
      {
        _id: req.cookies.cartId,
      },
      {
        user_id: user.id,
      }
    );

    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};
// [GET] /user/logout
module.exports.logout = async (req, res) => {
  try {
    res.clearCookie("tokenUser");
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};
// [GET] /user/password/forgot
module.exports.forgotPassword = async (req, res) => {
  try {
    res.render("clients/page/user/forgot-password", {
      pageTitle: "Lấy lại mật khẩu",
    });
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};

// [POST] /user/password/forgot
module.exports.forgotPasswordPost = async (req, res) => {
  try {
    const email = req.body.email;

    const user = await User.findOne({
      email: email,
      deleted: false,
    });

    if (!user) {
      req.flash("error", `Email không tồn tại!`);
      res.redirect("back");
      return;
    }

    // Việc 1: Tạo mã OTP và lưu OTP, email vào collection forgot-password
    const otp = generateHelper.generateRandomNumber(8);

    const objectForgotPassword = {
      email: email,
      otp: otp,
      expireAt: Date.now(),
    };

    const forgotPassword = new ForgotPassword(objectForgotPassword);
    await forgotPassword.save();

    // Việc 2: Gửi mã OTP qua email của user
    const subject = `Mã OTP xác minh lấy lại mật khẩu`;
    const html = `
    Mã OTP xác minh lấy lại mật khẩu là <b>${otp}</b>. Thời hạn sử dụng là 3 phút. Lưu ý không được để lộ mã OTP.
  `;

    sendMailHelper.sendMail(email, subject, html);
    res.redirect(`/user/password/otp?email=${email}`);
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};

// [GET] /user/password/otp
module.exports.otpPassword = async (req, res) => {
  try {
    const email = req.query.email;

    res.render("clients/page/user/otp-password", {
      pageTitle: "Nhập mã OTP",
      email: email,
    });
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};

// [POST] /user/password/otp
module.exports.otpPasswordPost = async (req, res) => {
  try {
    const email = req.body.email;
    const otp = req.body.otp;

    console.log({
      email: email,
      otp: otp,
    });

    const result = await ForgotPassword.findOne({
      email: email,
      otp: otp,
    });

    if (!result) {
      req.flash("error", `OTP không hợp lệ!`);
      res.redirect("back");
      return;
    }

    const user = await User.findOne({
      email: email,
    });

    res.cookie("tokenUser", user.tokenUser);

    res.redirect("/user/password/reset");
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};
// [GET] /user/password/reset
module.exports.resetPassword = async (req, res) => {
  try {
    res.render("clients/page/user/reset-password", {
      pageTitle: "Đổi mật khẩu",
    });
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};

// [POST] /user/password/reset
module.exports.resetPasswordPost = async (req, res) => {
  try {
    const password = req.body.password;
    const tokenUser = req.cookies.tokenUser;

    await User.updateOne(
      {
        tokenUser: tokenUser,
      },
      {
        password: md5(password),
      }
    );

    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};
// [GET] /user/info
module.exports.info = async (req, res) => {
  try {
    res.render("clients/page/user/info", {
      pageTitle: "Thông tin tài khoản",
    });
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};
// [GET] /user/my-account/edit
module.exports.editMyAccount = async (req, res) => {
  try {
    res.render("clients/page/user/editMyAccount", {
      pageTitle: "Thông tin tài khoản",
    });
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};
// [PATCH] /user/my-account/edit
module.exports.editMyAccountPatch = async (req, res) => {
  try {
    if (req.body.password) {
      req.body.password = md5(req.body.password);
      req.body.token = generateHelper.generateRandomString(30);
    } else {
      delete req.body.password;
    }

    await User.updateOne({ _id: res.locals.user.id }, req.body);

    res.redirect(`/user/info`);
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};
// [GET] /user/detail/:id
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
    res.render("clients/page/user/detail", {
      pageTitle: "Thông tin người dùng",
      item: item,
    });
  } catch (error) {
    res.redirect("back");
    console.log(error);
  }
};
