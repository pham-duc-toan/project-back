const express = require("express");
const router = express.Router();

const controller = require("../../controller/admin/user.controller");
router.get("/", controller.index);
router.get("/detail/:id", controller.detail);
router.delete("/delete/:id", controller.deleteItem);
router.patch("/change-status/:status/:id", controller.changeStatus);
module.exports = router;
