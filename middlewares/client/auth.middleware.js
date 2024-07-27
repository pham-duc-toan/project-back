const User = require("../../models/user.model");

module.exports.requireAuth = async (req, res, next) => {
  try {
    if (!req.cookies.tokenUser) {
      res.redirect(`/user/login`);
      return;
    }

    const user = await User.findOne({
      tokenUser: req.cookies.tokenUser,
    });

    if (!user) {
      res.redirect(`/user/login`);
      return;
    }

    next();
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};
