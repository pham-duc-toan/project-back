const homeRoutes = require("./home.route");
const productRoutes = require("./product.route");

module.exports = (app) => {
  app.use("/", homeRoutes);
  console.log("route");
  app.use("/products", productRoutes);
}