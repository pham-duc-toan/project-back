const Product = require("../../models/product.model");
const ProductCategory = require("../../models/product-category.model");
const Account = require("../../models/account.model");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");
const createTree = require("../../helpers/createTree");
const systemConfig = require("../../config/system");

// [GET] /admin/products
module.exports.index = async (req, res) => {
  const filterStatus = filterStatusHelper(req.query);
  let objectSearch = searchHelper(req.query);
  let find = {
    deleted: false,
  };
  if (req.query.status) {
    find.status = req.query.status;
  }
  if (objectSearch.regex) {
    find.title = objectSearch.regex;
  }
  // Pagination
  let initPagination = {
    currentPage: 1,
    limitItems: 4,
  };
  const countProducts = await Product.count(find);
  const objectPagination = paginationHelper(
    initPagination,
    req.query,
    countProducts
  );
  // End Pagination
  // Sort
  let sort = {};

  if (req.query.sortKey && req.query.sortValue) {
    sort[req.query.sortKey] = req.query.sortValue;
  } else {
    sort.position = "desc";
  }
  // End Sort
  const productsNoPagination = await Product.find(find);

  const products = await Product.find(find)
    .sort(sort)
    .limit(objectPagination.limitItems)
    .skip(objectPagination.skip);
  //logs lich su update create
  for (const product of products) {
    const userCreated = await Account.findOne({
      _id: product.createdBy.account_id,
    });

    if (userCreated) {
      product.createdBy.accountFullName = userCreated.fullName;
    }
    const userUpdatedId = product.updatedBy.slice(-1)[0];
    if (userUpdatedId) {
      const userUpdated = await Account.findOne({
        _id: userUpdatedId.account_id,
      });

      if (userUpdated) {
        userUpdatedId.accountFullName = userUpdated.fullName;
      }
    }
  }
  // end logs lich su deleted update create
  if (productsNoPagination.length > 0 && products.length == 0) {
    let stringQuery = "";

    for (const key in req.query) {
      if (key != "page") {
        stringQuery += `&${key}=${req.query[key]}`;
      }
    }

    const href = `${req.baseUrl}?page=1${stringQuery}`;

    res.redirect(href);
  } else {
    res.render(`admin/page/products/index`, {
      pageTitle: "Danh sách sản phẩm",
      products: products,
      filterStatus: filterStatus,
      keyword: objectSearch.keyword,
      pagination: objectPagination,
    });
  }
};
//[GET] /admin/products/position/swap/:id
module.exports.positionList = async (req, res) => {
  try {
    const id = req.params.id;
    const productItem = await Product.findOne({ _id: id });
    const products = await Product.find({
      deleted: false,
      _id: { $ne: id },
    }).sort({ position: "desc" });
    res.render("admin/page/products/swap-position", {
      products: products,
      productItem: productItem,
    });
  } catch (error) {
    res.redirect("back");
  }
};
//[PATCH] /admin/products/change-position/:id1/:id2
module.exports.swapPosition = async (req, res) => {
  try {
    const id1 = req.params.id1;
    const id2 = req.params.id2;
    const product1 = await Product.findOne({ _id: id1 });
    const product2 = await Product.findOne({ _id: id2 });
    await Product.updateOne({ _id: id1 }, { position: product2.position });
    await Product.updateOne({ _id: id2 }, { position: product1.position });
    req.flash("success", "Cập nhật thành công !");
    res.redirect("/admin/products");
  } catch (error) {
    res.redirect("back");
  }
};
// [PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;

  const updatedBy = {
    account_id: res.locals.user.id,
    updatedAt: new Date(),
  };

  await Product.updateOne(
    { _id: id },
    {
      status: status,
      $push: { updatedBy: updatedBy },
    }
  );
  req.flash("success", "Cập nhật thay đổi thành công!");
  res.redirect("back");
};
// [PATCH] /admin/products/change-multi

module.exports.changeMulti = async (req, res) => {
  const type = req.body.type;
  const ids = req.body.ids.split(", ");
  const updatedBy = {
    account_id: res.locals.user.id,
    updatedAt: new Date(),
  };
  switch (type) {
    case "active":
    case "inactive":
      await Product.updateMany(
        { _id: { $in: ids } },
        {
          status: type,
          $push: { updatedBy: updatedBy },
        }
      );
      req.flash("success", "Cập nhật thay đổi thành công!");
      break;
    case "delete-all":
      await Product.updateMany(
        { _id: { $in: ids } },
        {
          deleted: true,
          deletedBy: {
            account_id: res.locals.user.id,
            deletedAt: new Date(),
          },
        }
      );
      req.flash("success", `Xóa thành công!`);
      break;
    default:
      break;
  }
  res.redirect("back");
};

// [DELETE] /admin/products/delete/:id
module.exports.deleteItem = async (req, res) => {
  const id = req.params.id;

  await Product.updateOne(
    { _id: id },
    {
      deleted: true,
      deletedBy: {
        account_id: res.locals.user.id,
        deletedAt: new Date(),
      },
    }
  );
  req.flash("success", `Xóa thành công!`);
  res.redirect("back");
};
// [GET] /admin/products/create
module.exports.create = async (req, res) => {
  let find = {
    deleted: false,
  };

  const records = await ProductCategory.find(find);

  const newRecords = createTree(records);

  res.render(`${systemConfig.prefixAdmin}/page/products/create`, {
    pageTitle: "Tạo mới sản phẩm",
    records: newRecords,
  });
};

// [POST] /admin/products/create
module.exports.createPost = async (req, res) => {
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);

  req.body.stock = parseInt(req.body.stock);

  const allProduct = await Product.find();
  var position = 0;
  for (const product of allProduct) {
    position = Math.max(product.position, position);
  }
  req.body.position = position + 1;

  req.body.createdBy = {
    account_id: res.locals.user.id,
  };

  const product = new Product(req.body);
  await product.save();
  req.flash("success", `Tạo thành công`);
  res.redirect(`/${systemConfig.prefixAdmin}/products`);
};
// [GET] /admin/products/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;

    const product = await Product.findOne({
      _id: id,
      deleted: false,
    });

    const records = await ProductCategory.find({
      deleted: false,
    });

    const newRecords = createTree(records);
    res.render(`${systemConfig.prefixAdmin}/page/products/edit`, {
      pageTitle: "Chỉnh sửa sản phẩm",
      product: product,
      records: newRecords,
    });
  } catch (error) {
    res.redirect(`/${systemConfig.prefixAdmin}/products`);
  }
};

// [PATCH] /admin/products/edit/:id
module.exports.editPatch = async (req, res) => {
  try {
    const id = req.params.id;

    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);

    const updatedBy = {
      account_id: res.locals.user.id,
      updatedAt: new Date(),
    };

    await Product.updateOne(
      { _id: id },
      {
        ...req.body,
        $push: { updatedBy: updatedBy },
      }
    );

    req.flash("success", "Cập nhật sản phẩm thành công!");

    res.redirect(`/${systemConfig.prefixAdmin}/products`);
  } catch (error) {
    console.log(req.body);
    console.log(error);
    res.redirect("back");
  }
};
// [GET] /admin/products/detail/:id
module.exports.detail = async (req, res) => {
  try {
    const id = req.params.id;

    const product = await Product.findOne({
      _id: id,
      deleted: false,
    });

    res.render(`${systemConfig.prefixAdmin}/page/products/detail`, {
      pageTitle: "Chi tiết sản phẩm",
      product: product,
    });
  } catch (error) {
    res.redirect(`/${systemConfig.prefixAdmin}/products`);
  }
};
