const ProductCategory = require("../../models/product-category.model");

const systemConfig = require("../../config/system");

const createTree = require("../../helpers/createTree");

// [GET] /admin/products-category
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };

  const records = await ProductCategory.find(find);

  const newRecords = createTree(records);

  res.render("admin/page/products-category/index", {
    pageTitle: "Danh mục sản phẩm",
    records: newRecords,
  });
};

// [GET] /admin/products-category/create
module.exports.create = async (req, res) => {
  let find = {
    deleted: false,
  };

  const records = await ProductCategory.find(find);

  const newRecords = createTree(records);

  res.render("admin/page/products-category/create", {
    pageTitle: "Tạo Danh mục sản phẩm",
    records: newRecords,
  });
};

// [POST] /admin/products-category/create
module.exports.createPost = async (req, res) => {
  const allItem = await ProductCategory.find();
  var position = 0;
  for (const item of allItem) {
    position = Math.max(item.position, position);
  }
  req.body.position = position + 1;

  const record = new ProductCategory(req.body);
  await record.save();
  req.flash("success", `Tạo danh mục thành công`);
  res.redirect(`/${systemConfig.prefixAdmin}/products-category`);
};
// [GET] /admin/products-category/edit/:id
module.exports.edit = async (req, res) => {
  const id = req.params.id;

  const data = await ProductCategory.findOne({
    _id: id,
    deleted: false,
  });

  const records = await ProductCategory.find({
    deleted: false,
  });

  const newRecords = createTree(records);

  res.render("admin/page/products-category/edit", {
    pageTitle: "Chỉnh sửa Danh mục sản phẩm",
    data: data,
    records: newRecords,
  });
};

// [PATCH] /admin/products-category/edit/:id
module.exports.editPatch = async (req, res) => {
  const id = req.params.id;

  await ProductCategory.updateOne({ _id: id }, req.body);
  req.flash("success", `Sửa danh mục thành công`);
  res.redirect(`/${systemConfig.prefixAdmin}/products-category`);
};
//[GET] /admin/products-category/change-status/:id
module.exports.changeStatus = async (req, res) => {};
