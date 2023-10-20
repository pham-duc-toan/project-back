const homeRoutes = require("./home.route");
const productRoutes = require("./product.route");
const searchRoutes = require("./search.route");
const categoryMiddleware = require("../../middlewares/client/category.middleware");
const cartMiddleware = require("../../middlewares/client/cart.middleware");
const cartRoutes = require("./cart.route");
const checkoutRoutes = require("./checkout.route");
const userRoutes = require("./user.route");
const userMiddleware = require("../../middlewares/client/user.middleware");
module.exports = (app) => {
  app.use(categoryMiddleware.category);
  app.use(cartMiddleware.cartId);
  app.use(userMiddleware.infoUser);
  app.use("/", homeRoutes);
  console.log("route");
  app.use("/cart", cartRoutes);
  app.use("/checkout", checkoutRoutes);
  app.use("/products", productRoutes);
  app.use("/search", searchRoutes);
  app.use("/user", userRoutes);
}