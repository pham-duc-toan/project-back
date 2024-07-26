const express = require("express");
const router = express.Router();

const controller = require("../../controller/admin/order.controller");
router.get("/", controller.index);
router.get("/detail/:id", controller.detail);
router.delete("/delete/:id", controller.deleteItem);
router.get("/received/:id", controller.received);
module.exports = router;
