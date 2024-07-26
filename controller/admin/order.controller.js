const { priceNewProduct } = require("../../helpers/products");
const Order = require("../../models/order.model");
const Product = require("../../models/product.model");
// [GET] /admin/orders
module.exports.index = async (req, res) => {
  try {
    const records = await Order.find({ status: "transport" });
    for (const record of records) {
      const total = record.products.reduce((accumulator, product) => {
        const productTotal =
          product.quantity *
          (product.price * (1 - product.discountPercentage / 100));
        return accumulator + productTotal;
      }, 0);

      record.totalPrice = Math.round(total);
    }

    res.render("admin/page/order/index", {
      pageTitle: "Danh sách đơn hàng",
      records: records,
    });
  } catch (error) {
    res.redirect("back");
    console.log(error);
  }
};
// [GET] /admin/orders/received/:id
module.exports.received = async (req, res) => {
  try {
    await Order.updateOne(
      { _id: req.params.id },
      {
        status: "received",
      }
    );
    res.redirect("back");
  } catch (error) {
    res.redirect("back");
    console.log(error);
  }
};
// [DELETE] /admin/orders/delete/:id
module.exports.deleteItem = async (req, res) => {
  try {
    await Order.deleteOne({ _id: req.params.id });
    res.redirect("back");
  } catch (error) {
    res.redirect("back");
    console.log(error);
  }
};
// [GET] /admin/orders/detail/:id
module.exports.detail = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
    });

    for (const product of order.products) {
      const productInfo = await Product.findOne({
        _id: product.product_id,
      }).select("title thumbnail");

      product.productInfo = productInfo;

      product.priceNew = priceNewProduct(product);

      product.totalPrice = product.priceNew * product.quantity;
    }

    order.totalPrice = order.products.reduce(
      (sum, item) => sum + item.totalPrice,
      0
    );

    res.render("admin/page/order/detail", {
      pageTitle: "Chi tiết đơn hàng",
      order: order,
    });
  } catch (error) {
    res.redirect("back");
    console.log(error);
  }
};
