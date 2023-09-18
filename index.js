const express = require("express");
require("dotenv").config();
const systemConfig = require("./config/system");
const routeAdmin = require("./routes/admin/index.route");
const route = require("./routes/clients/index.route");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT;
// const port = 3000;

app.set("views", "./views");
app.set("view engine", "pug");
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: false }));



app.locals.prefixAdmin = systemConfig.prefixAdmin;
// Routes
route(app);
routeAdmin(app);
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});