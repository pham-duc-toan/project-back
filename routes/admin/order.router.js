const express = require("express");
const router = express.Router();
const middlewareRole = require("../../middlewares/admin/role.middleware");
const controller = require("../../controller/admin/order.controller");
router.get("/", middlewareRole.viewOrder, controller.index);
router.get("/detail/:id", middlewareRole.viewOrder, controller.detail);
router.delete("/delete/:id", middlewareRole.deleteOrder, controller.deleteItem);
router.get("/received/:id", middlewareRole.editOrder, controller.received);
module.exports = router;
