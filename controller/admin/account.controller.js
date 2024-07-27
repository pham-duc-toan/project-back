const md5 = require("md5");

const Account = require("../../models/account.model");
const Role = require("../../models/role.model");
const generate = require("../../helpers/generate");
const systemConfig = require("../../config/system");

// [GET] /admin/accounts
module.exports.index = async (req, res) => {
  try {
    const records = await Account.find({
      deleted: false,
    });

    for (const record of records) {
      const role = await Role.findOne({ _id: record.role_id });
      record.role = role;
    }

    res.render("admin/page/accounts/index", {
      pageTitle: "Danh sách tài khoản",
      records: records,
    });
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};

// [GET] /admin/accounts/create
module.exports.create = async (req, res) => {
  try {
    const roles = await Role.find({
      deleted: false,
    });

    res.render("admin/page/accounts/create", {
      pageTitle: "Tạo mới tài khoản",
      roles: roles,
    });
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};

// [POST] /admin/accounts/create
module.exports.createPost = async (req, res) => {
  try {
    req.body.password = md5(req.body.password);
    const token = generate.generateRandomString(30);
    req.body.token = token;
    const record = new Account(req.body);
    await record.save();

    res.redirect(`/${systemConfig.prefixAdmin}/accounts`);
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};

// [GET] /admin/accounts/edit/:id
module.exports.edit = async (req, res) => {
  let find = {
    _id: req.params.id,
    deleted: false,
  };

  try {
    const data = await Account.findOne(find);

    const roles = await Role.find({
      deleted: false,
    });

    res.render("admin/page/accounts/edit", {
      pageTitle: "Chỉnh sửa tài khoản",
      data: data,
      roles: roles,
    });
  } catch (error) {
    res.redirect(`/${systemConfig.prefixAdmin}/accounts`);
  }
};

// [PATCH] /admin/accounts/edit/:id
module.exports.editPatch = async (req, res) => {
  try {
    await Account.updateOne({ _id: req.params.id }, req.body);

    res.redirect(`/${systemConfig.prefixAdmin}/accounts`);
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};
// [PATCH] /admin/accounts/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  try {
    const status = req.params.status;
    const id = req.params.id;

    const updatedBy = {
      account_id: res.locals.user.id,
      updatedAt: new Date(),
    };

    await Account.updateOne(
      { _id: id },
      {
        status: status,
        $push: { updatedBy: updatedBy },
      }
    );
    req.flash("success", "Cập nhật thay đổi thành công!");
    res.redirect("back");
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};
// [DELETE] /admin/accounts/delete/:id
module.exports.deleteItem = async (req, res) => {
  try {
    const id = req.params.id;

    await Account.deleteOne({ _id: id });
    req.flash("success", `Đã xóa vĩnh viễn!`);
    res.redirect("back");
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};
// [GET] /admin/accounts/detail/:id
module.exports.detail = async (req, res) => {
  try {
    const id = req.params.id;
    const item = await Account.findOne({
      deleted: false,
      _id: id,
    });

    const role = await Role.findOne({ _id: item.role_id });
    item.role = role;
    res.render("admin/page/accounts/detail", {
      pageTitle: "Chi tiết tài khoản",
      item: item,
    });
  } catch (error) {
    res.redirect("back");
    console.log(error);
  }
};
