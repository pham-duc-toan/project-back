const Account = require("../../models/account.model");
const systemConfig = require("../../config/system");
const Role = require("../../models/role.model");
module.exports.requireAuth = async (req, res, next) => {
  try {
    if (!req.cookies.token) {
      res.redirect(`/${systemConfig.prefixAdmin}/auth/login`);
      return;
    }

    const user = await Account.findOne({
      token: req.cookies.token,
    });

    if (!user) {
      res.redirect(`/${systemConfig.prefixAdmin}/auth/login`);
      return;
    }
    const role = await Role.findOne({
      _id: user.role_id,
    }).select("title permissions");

    res.locals.user = user;
    res.locals.role = role;
    next();
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};
