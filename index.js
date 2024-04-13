const express = require("express");
require("dotenv").config();
const path = require("path");
const systemConfig = require("./config/system");
const routeAdmin = require("./routes/admin/index.route");
const route = require("./routes/clients/index.route");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const app = express();

//Tao server socket.io
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server);
global._io = io;

const port = process.env.PORT;
const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const moment = require("moment");
// const port = 3000;

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");
app.use(express.static(`${__dirname}/public`));
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: false }));

// Flash
app.use(cookieParser("LHNASDASDAD"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());
// End Flash

// TinyMCE
app.use(
  "/tinymce",
  express.static(path.join(__dirname, "node_modules", "tinymce"))
);
// End TinyMCE
app.locals.prefixAdmin = systemConfig.prefixAdmin;
app.locals.moment = moment;
// Routes
route(app);
routeAdmin(app);
app.get("*", (req, res) => {
  res.render("clients/page/errors/404", {
    pageTitle: "404 Not Found",
  });
});
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
