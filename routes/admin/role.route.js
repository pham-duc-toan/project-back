const express = require("express");
const router = express.Router();
const middlewareRole = require("../../middlewares/admin/role.middleware");
const controller = require("../../controller/admin/role.controller");

router.get("/", middlewareRole.viewRole, controller.index);

router.get("/create", middlewareRole.createRole, controller.create);

router.post("/create", middlewareRole.createRole, controller.createPost);
router.get("/edit/:id", middlewareRole.editRole, controller.edit);

router.patch("/edit/:id", middlewareRole.editRole, controller.editPatch);

router.get(
  "/permissions",
  middlewareRole.permissionRole,
  controller.permissions
);

router.patch(
  "/permissions",
  middlewareRole.permissionRole,
  controller.permissionsPatch
);

router.get("/detail/:id", middlewareRole.viewRole, controller.detail);

router.delete("/delete/:id", middlewareRole.deleteRole, controller.deleteItem);
module.exports = router;
