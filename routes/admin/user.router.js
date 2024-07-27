const express = require("express");
const router = express.Router();
const middlewareRole = require("../../middlewares/admin/role.middleware");
const controller = require("../../controller/admin/user.controller");
router.get("/", middlewareRole.viewUser, controller.index);
router.get("/detail/:id", middlewareRole.viewUser, controller.detail);
router.delete("/delete/:id", middlewareRole.deleteUser, controller.deleteItem);
router.patch(
  "/change-status/:status/:id",
  middlewareRole.editUser,
  controller.changeStatus
);
module.exports = router;
