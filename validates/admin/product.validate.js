module.exports.createPost = (req, res, next) => {
  if (!req.body.title) {
    req.flash("error", `Tiêu đề không được để trống!`);
    res.redirect("back");
    return;
  }
  if (req.body.discountPercentage > 100) {
    req.flash("error", `Giảm giá không hợp lệ`);
    res.redirect("back");
    return;
  }
  if (!req.body.product_category_id) {
    req.flash("error", `Không được để trống danh mục`);
    res.redirect("back");
    return;
  }

  next();
};
