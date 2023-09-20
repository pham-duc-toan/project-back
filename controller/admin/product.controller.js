const Product = require("../../models/product.model");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");
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
  
    const products = await Product.find(find)
      .limit(objectPagination.limitItems)
      .skip(objectPagination.skip);
  
  
  res.render("admin/page/products/index", {
    pageTitle: "Danh sách sản phẩm",
    products: products,    
    filterStatus: filterStatus,   
    keyword: objectSearch.keyword,
    pagination: objectPagination
  });
}
// [PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;

  await Product.updateOne({ _id: id }, { status: status });

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
    deletedAt: new Date()
  });
  res.redirect("back");

}