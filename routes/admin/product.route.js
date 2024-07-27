const express = require("express");
const multer = require("multer");
const router = express.Router();

const upload = multer();

const controller = require("../../controller/admin/product.controller");
const validate = require("../../validates/admin/product.validate");
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
const middlewareRole = require("../../middlewares/admin/role.middleware");
router.get("/", middlewareRole.viewProduct, controller.index);
router.get(
  "/position/swap/:id",
  middlewareRole.viewProduct,
  controller.positionList
);
router.patch(
  "/change-position/:id1/:id2",
  middlewareRole.editProduct,
  controller.swapPosition
);
router.patch(
  "/change-status/:status/:id",
  middlewareRole.editProduct,
  controller.changeStatus
);
router.patch(
  "/change-multi",
  middlewareRole.editProduct,
  controller.changeMulti
);
router.delete(
  "/delete/:id",
  middlewareRole.deleteProduct,
  controller.deleteItem
);
router.get("/create", middlewareRole.createProduct, controller.create);
router.post(
  "/create",
  middlewareRole.createProduct,
  upload.single("thumbnail"),
  uploadCloud.upload,
  validate.createPost,

  controller.createPost
);
router.get("/edit/:id", middlewareRole.editProduct, controller.edit);

router.patch(
  "/edit/:id",
  middlewareRole.editProduct,
  upload.single("thumbnail"),
  uploadCloud.upload,
  validate.createPost,

  controller.editPatch
);
router.get("/detail/:id", middlewareRole.viewProduct, controller.detail);
module.exports = router;
