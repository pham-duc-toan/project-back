const express = require("express");
const multer = require("multer");
const router = express.Router();

const upload = multer();

const controller = require("../../controller/admin/product-category.controller");
const middlewareRole = require("../../middlewares/admin/role.middleware");
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

router.get("/", middlewareRole.viewProductCategory, controller.index);

router.get("/create", middlewareRole.createProductCategory, controller.create);

router.post(
  "/create",
  middlewareRole.createProductCategory,
  upload.single("thumbnail"),
  uploadCloud.upload,
  controller.createPost
);

router.get("/edit/:id", middlewareRole.editProductCategory, controller.edit);

router.patch(
  "/edit/:id",
  middlewareRole.editProductCategory,
  upload.single("thumbnail"),
  uploadCloud.upload,
  controller.editPatch
);
router.get(
  "/delete/:id",
  middlewareRole.deleteProductCategory,
  controller.deleteItem
);
router.get(
  "/change-status/:status/:id",
  middlewareRole.editProductCategory,
  controller.changeStatus
);
router.get(
  "/detail/:id",
  middlewareRole.viewProductCategory,
  controller.detail
);
module.exports = router;
