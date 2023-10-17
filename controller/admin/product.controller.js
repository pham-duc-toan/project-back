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
    deleted: false
  
  };
  if(req.query.status) {
    find.status = req.query.status;
  }
  if(objectSearch.regex){
    find.title = objectSearch.regex;
  }
    // Pagination
    let initPagination = {
      currentPage: 1,
      limitItems: 4
    };
    const countProducts = await Product.count(find);
    const objectPagination = paginationHelper(initPagination, req.query, countProducts);
    // End Pagination
    // Sort
    let sort = {};

    if(req.query.sortKey && req.query.sortValue) {
      sort[req.query.sortKey] = req.query.sortValue;
    } else {
      sort.position = "desc";
    }
    // End Sort
    const productsNoPagination = await Product.find(find)
    
    const products = await Product.find(find)
      .sort(sort)
      .limit(objectPagination.limitItems)
      .skip(objectPagination.skip);
  
  for (const product of products) {
    const user = await Account.findOne({
      _id: product.createdBy.account_id
    });

    if(user) {
      product.createdBy.accountFullName = user.fullName;
    }
  }
  
  if(productsNoPagination.length > 0 && products.length == 0 ) {
    let stringQuery = "";

    for(const key in req.query) {
      if(key != "page") {
        stringQuery += `&${key}=${req.query[key]}`;
      }
    }

    const href = `${req.baseUrl}?page=1${stringQuery}`;

    res.redirect(href);
  }
  else {
    res.render(`${systemConfig.prefixAdmin}/page/products/index`, {
      pageTitle: "Danh sách sản phẩm",
      products: products,    
      filterStatus: filterStatus,   
      keyword: objectSearch.keyword,
      pagination: objectPagination
    });
  }
}
//những hàm patch hay delete chỉ có tác dụng sửa lại data products
// [PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;

  await Product.updateOne({ _id: id }, { status: status });
  req.flash("success", "Cập nhật thay đổi thành công!");
  res.redirect("back");
}
// [PATCH] /admin/products/change-multi

module.exports.changeMulti = async (req, res) => {
  const type = req.body.type;
  const ids = req.body.ids.split(", ");
  switch (type) {
    case "active":
    case "inactive":
      await Product.updateMany({ _id: {$in: ids} }, { status: type });
      req.flash("success", "Cập nhật thay đổi thành công!");
      break;
    case "delete-all":
      await Product.updateMany({ _id: {$in: ids} }, {
        deleted: true,
        deletedBy: {
          account_id: res.locals.user.id,
          deletedAt: new Date(),
        }
      });
      req.flash("success", `Xóa thành công!`);
      break;
    case "change-position":
      for (const item of ids) {
        const [id, position] = item.split("-");
        await Product.updateOne({ _id: id }, { position: position });
        req.flash("success", "Cập nhật thay đổi thành công!");
      }
      break;
    default:
      break;
  }
  res.redirect("back");
}

// [DELETE] /admin/products/delete/:id
module.exports.deleteItem = async (req, res) => {
  const id = req.params.id;

  await Product.updateOne({ _id: id }, {
    deleted: true,
    deletedBy: {
      account_id: res.locals.user.id,
      deletedBy: {
        account_id: res.locals.user.id,
        deletedAt: new Date(),
      }
    }
  });
  req.flash("success", `Xóa thành công!`);
  res.redirect("back");

}
// [GET] /admin/products/create
module.exports.create = async (req, res) => {
  let find = {
    deleted: false
  }

  const records = await ProductCategory.find(find);

  const newRecords = createTree(records);

  res.render(`${systemConfig.prefixAdmin}/page/products/create`, {
    pageTitle: "Tạo mới sản phẩm",
    records: newRecords
  });
};

// [POST] /admin/products/create
module.exports.createPost = async (req, res) => {
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);

  if(req.body.position === "") {
    const countProducts = await Product.countDocuments();
    req.body.position = countProducts + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }

  req.body.createdBy = {
    account_id: res.locals.user.id
  };

  const product = new Product(req.body);
  await product.save();

  res.redirect(`/${systemConfig.prefixAdmin}/products`);
};
// [GET] /admin/products/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;

    const product = await Product.findOne({
      _id: id,
      deleted: false
    });

  
    const records = await ProductCategory.find({
      deleted: false
    });

    const newRecords = createTree(records);
    res.render(`${systemConfig.prefixAdmin}/page/products/edit`, {
      pageTitle: "Chỉnh sửa sản phẩm",
      product: product,
      records: newRecords
  });
  } catch (error) {
    res.redirect(`/${systemConfig.prefixAdmin}/products`);
  }
};

// [PATCH] /admin/products/edit/:id
module.exports.editPatch = async (req, res) => {
  const id = req.params.id;

  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);

  req.body.position = parseInt(req.body.position);

  

  await Product.updateOne({ _id: id }, req.body);

  req.flash("success", "Cập nhật sản phẩm thành công!");

  res.redirect("back");
}
// [GET] /admin/products/detail/:id
module.exports.detail = async (req, res) => {
  try {
    const id = req.params.id;

    const product = await Product.findOne({
      _id: id,
      deleted: false
    });

    res.render(`${systemConfig.prefixAdmin}/page/products/detail`, {
      pageTitle: "Chi tiết sản phẩm",
      product: product
    });
  } catch (error) {
    res.redirect(`/${systemConfig.prefixAdmin}/products`);
  }
}