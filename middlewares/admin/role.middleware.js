//PRODUCT
module.exports.viewProduct = async (req, res, next) => {
  try {
    const listRole = res.locals.role.permissions;
    if (!listRole.includes("products_view")) {
      req.flash("error", "Bạn không có quyền này!");
      res.redirect("back");
      return;
    }
    next();
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};
module.exports.createProduct = async (req, res, next) => {
  try {
    const listRole = res.locals.role.permissions;
    if (!listRole.includes("products_create")) {
      req.flash("error", "Bạn không có quyền này!");
      res.redirect("back");
      return;
    }
    next();
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};
module.exports.deleteProduct = async (req, res, next) => {
  try {
    const listRole = res.locals.role.permissions;

    if (!listRole.includes("products_delete")) {
      req.flash("error", "Bạn không có quyền này!");
      res.redirect("back");
      return;
    }
    next();
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};
module.exports.editProduct = async (req, res, next) => {
  try {
    const listRole = res.locals.role.permissions;

    if (!listRole.includes("products_edit")) {
      req.flash("error", "Bạn không có quyền này!");
      res.redirect("back");
      return;
    }
    next();
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};
//PRODUCT-CATEGORY
module.exports.viewProductCategory = async (req, res, next) => {
  try {
    const listRole = res.locals.role.permissions;

    if (!listRole.includes("products-category_view")) {
      req.flash("error", "Bạn không có quyền này!");
      res.redirect("back");
      return;
    }
    next();
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};
module.exports.createProductCategory = async (req, res, next) => {
  try {
    const listRole = res.locals.role.permissions;
    if (!listRole.includes("products-category_create")) {
      req.flash("error", "Bạn không có quyền này!");
      res.redirect("back");
      return;
    }
    next();
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};
module.exports.deleteProductCategory = async (req, res, next) => {
  try {
    const listRole = res.locals.role.permissions;
    if (!listRole.includes("products-category_delete")) {
      req.flash("error", "Bạn không có quyền này!");
      res.redirect("back");
      return;
    }
    next();
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};
module.exports.editProductCategory = async (req, res, next) => {
  try {
    const listRole = res.locals.role.permissions;
    if (!listRole.includes("products-category_edit")) {
      req.flash("error", "Bạn không có quyền này!");
      res.redirect("back");
      return;
    }
    next();
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};
//ROLE
module.exports.viewRole = async (req, res, next) => {
  try {
    const listRole = res.locals.role.permissions;
    if (!listRole.includes("roles_view")) {
      req.flash("error", "Bạn không có quyền này!");
      res.redirect("back");
      return;
    }
    next();
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};
module.exports.createRole = async (req, res, next) => {
  try {
    const listRole = res.locals.role.permissions;
    if (!listRole.includes("roles_create")) {
      req.flash("error", "Bạn không có quyền này!");
      res.redirect("back");
      return;
    }
    next();
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};
module.exports.deleteRole = async (req, res, next) => {
  try {
    const listRole = res.locals.role.permissions;
    if (!listRole.includes("roles_delete")) {
      req.flash("error", "Bạn không có quyền này!");
      res.redirect("back");
      return;
    }
    next();
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};
module.exports.editRole = async (req, res, next) => {
  try {
    const listRole = res.locals.role.permissions;
    if (!listRole.includes("roles_edit")) {
      req.flash("error", "Bạn không có quyền này!");
      res.redirect("back");
      return;
    }
    next();
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};
module.exports.permissionRole = async (req, res, next) => {
  try {
    const listRole = res.locals.role.permissions;
    if (!listRole.includes("roles_permissions")) {
      req.flash("error", "Bạn không có quyền này!");
      res.redirect("back");
      return;
    }
    next();
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};
//ACCOUNT
module.exports.viewAccount = async (req, res, next) => {
  try {
    const listRole = res.locals.role.permissions;
    if (!listRole.includes("accounts_view")) {
      req.flash("error", "Bạn không có quyền này!");
      res.redirect("back");
      return;
    }
    next();
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};
module.exports.createAccount = async (req, res, next) => {
  try {
    const listRole = res.locals.role.permissions;
    if (!listRole.includes("accounts_create")) {
      req.flash("error", "Bạn không có quyền này!");
      res.redirect("back");
      return;
    }
    next();
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};
module.exports.deleteAccount = async (req, res, next) => {
  try {
    const listRole = res.locals.role.permissions;
    if (!listRole.includes("accounts_delete")) {
      req.flash("error", "Bạn không có quyền này!");
      res.redirect("back");
      return;
    }
    next();
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};
module.exports.editAccount = async (req, res, next) => {
  try {
    const listRole = res.locals.role.permissions;
    if (!listRole.includes("accounts_edit")) {
      req.flash("error", "Bạn không có quyền này!");
      res.redirect("back");
      return;
    }
    next();
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};
//USER
module.exports.viewUser = async (req, res, next) => {
  try {
    const listRole = res.locals.role.permissions;
    if (!listRole.includes("users_view")) {
      req.flash("error", "Bạn không có quyền này!");
      res.redirect("back");
      return;
    }
    next();
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};
module.exports.deleteUser = async (req, res, next) => {
  try {
    const listRole = res.locals.role.permissions;
    if (!listRole.includes("users_delete")) {
      req.flash("error", "Bạn không có quyền này!");
      res.redirect("back");
      return;
    }
    next();
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};
module.exports.editUser = async (req, res, next) => {
  try {
    const listRole = res.locals.role.permissions;
    if (!listRole.includes("users_edit")) {
      req.flash("error", "Bạn không có quyền này!");
      res.redirect("back");
      return;
    }
    next();
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};
//ORDER
module.exports.viewOrder = async (req, res, next) => {
  try {
    const listRole = res.locals.role.permissions;
    if (!listRole.includes("orders_view")) {
      req.flash("error", "Bạn không có quyền này!");
      res.redirect("back");
      return;
    }
    next();
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};
module.exports.deleteOrder = async (req, res, next) => {
  try {
    const listRole = res.locals.role.permissions;
    if (!listRole.includes("orders_delete")) {
      req.flash("error", "Bạn không có quyền này!");
      res.redirect("back");
      return;
    }
    next();
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};
module.exports.editOrder = async (req, res, next) => {
  try {
    const listRole = res.locals.role.permissions;
    if (!listRole.includes("orders_edit")) {
      req.flash("error", "Bạn không có quyền này!");
      res.redirect("back");
      return;
    }
    next();
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};
//SETTING
module.exports.editSetting = async (req, res, next) => {
  try {
    const listRole = res.locals.role.permissions;
    if (!listRole.includes("setting_edit")) {
      req.flash("error", "Bạn không có quyền này!");
      res.redirect("back");
      return;
    }
    next();
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};
