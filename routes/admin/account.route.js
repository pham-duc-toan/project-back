const express = require("express");
const multer = require("multer");
const router = express.Router();
const middlewareRole = require("../../middlewares/admin/role.middleware");
const upload = multer();

const controller = require("../../controller/admin/account.controller");

const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

router.get("/", middlewareRole.viewAccount, controller.index);

router.get("/create", middlewareRole.createAccount, controller.create);

router.post(
  "/create",
  middlewareRole.createAccount,
  upload.single("avatar"),
  uploadCloud.upload,
  controller.createPost
);

router.get("/edit/:id", middlewareRole.editAccount, controller.edit);
router.patch(
  "/change-status/:status/:id",
  middlewareRole.editAccount,
  controller.changeStatus
);
router.delete(
  "/delete/:id",
  middlewareRole.deleteAccount,
  controller.deleteItem
);
router.patch(
  "/edit/:id",
  middlewareRole.editAccount,
  upload.single("avatar"),
  uploadCloud.upload,
  controller.editPatch
);
router.get("/detail/:id", middlewareRole.viewAccount, controller.detail);
module.exports = router;
