const Order = require("../../models/order.model");
// [GET] /admin/orders
module.exports.index = async (req, res) => {
  try {
    const records = await Order.find({});
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
