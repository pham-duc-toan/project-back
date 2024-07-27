const Role = require("../../models/role.model");

const systemConfig = require("../../config/system");

// [GET] /admin/roles
module.exports.index = async (req, res) => {
  try {
    const records = await Role.find({
      deleted: false,
    });

    res.render("admin/page/roles/index", {
      pageTitle: "Danh sách nhóm quyền",
      records: records,
    });
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};

// [POST] /admin/roles/create
module.exports.create = async (req, res) => {
  try {
    res.render("admin/page/roles/create", {
      pageTitle: "Tạo mới nhóm quyền",
    });
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};

// [GET] /admin/roles/createPost
module.exports.createPost = async (req, res) => {
  try {
    const record = new Role(req.body);
    await record.save();

    req.flash("success", "Thêm nhóm quyền thành công");

    res.redirect(`/${systemConfig.prefixAdmin}/roles`);
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};
// [GET] /admin/roles/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;

    const data = await Role.findOne({
      _id: id,
      deleted: false,
    });

    res.render("admin/page/roles/edit", {
      pageTitle: "Chỉnh sửa nhóm quyền",
      data: data,
    });
  } catch (error) {
    res.redirect(`/${systemConfig.prefixAdmin}/roles`);
  }
};

// [PATCH] /admin/roles/edit/:id
module.exports.editPatch = async (req, res) => {
  try {
    const id = req.params.id;

    await Role.updateOne({ _id: id }, req.body);

    req.flash("success", "Cập nhật nhóm quyền thành công");

    res.redirect("back");
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};
// [GET] /admin/roles/permissions
module.exports.permissions = async (req, res) => {
  try {
    const records = await Role.find({
      deleted: false,
    });

    res.render("admin/page/roles/permissions", {
      pageTitle: "Phân quyền",
      records: records,
    });
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};

// [PATCH] /admin/roles/permissions
module.exports.permissionsPatch = async (req, res) => {
  try {
    const permissions = JSON.parse(req.body.permissions);
    console.log(permissions);
    for (const item of permissions) {
      await Role.updateOne(
        {
          _id: item.id,
        },
        {
          permissions: item.permissions,
        }
      );
    }

    req.flash("success", "Cập nhật phân quyền thành công!");

    res.redirect("back");
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};
// [GET] /admin/roles/detail/:id
module.exports.detail = async (req, res) => {
  try {
    const item = await Role.findOne({
      _id: req.params.id,
      deleted: false,
    });

    res.render("admin/page/roles/detail", {
      pageTitle: "Chi tiết nhóm quyền",
      item: item,
    });
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};
// [DELETE] /admin/roles/delete/:id
module.exports.deleteItem = async (req, res) => {
  try {
    const id = req.params.id;

    await Role.deleteOne({ _id: id });
    req.flash("success", `Đã xóa vĩnh viễn!`);
    res.redirect("back");
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};
