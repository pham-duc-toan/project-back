const ProductCategory = require("../../models/product-category.model");

const systemConfig = require("../../config/system");

const createTree = require("../../helpers/createTree");
const Account = require("../../models/account.model");

// [GET] /admin/products-category
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };

  const records = await ProductCategory.find(find);
  //logs lich su update create
  for (const product of records) {
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
  req.body.createdBy = {
    account_id: res.locals.user.id,
  };

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
  try {
    var check = async (checkId, parentCheck) => {
      if (checkId) {
        if (checkId.id == parentCheck) return false;

        const listCheck = await ProductCategory.find({
          parent_id: checkId.id,
        }).select("id parent_id title");

        let results = await Promise.all(
          listCheck.map(async (ele) => {
            if (ele) {
              return check(ele, parentCheck);
            }
            return true;
          })
        );

        let result = results.every((res) => res);

        console.log(checkId, result);
        return result;
      }
      return true;
    };

    const id = req.params.id;
    const updatedBy = {
      account_id: res.locals.user.id,
      updatedAt: new Date(),
    };

    var checkId = await ProductCategory.findOne({ _id: id }).select(
      "id parent_id title"
    );
    const result = await check(checkId, req.body.parent_id);

    if (!result) {
      req.flash("error", "Danh mục cha không phù hợp");
      res.redirect("back");
      return;
    }

    await ProductCategory.updateOne(
      { _id: id },
      {
        ...req.body,
        $push: { updatedBy: updatedBy },
      }
    );

    req.flash("success", `Sửa danh mục thành công`);
    res.redirect(`/${systemConfig.prefixAdmin}/products-category`);
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};
//[GET] /admin/products-category/change-status/:id
module.exports.changeStatus = async (req, res) => {};
