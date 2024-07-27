const express = require("express");
const multer = require("multer");
const router = express.Router();

const upload = multer();

const controller = require("../../controller/admin/setting.controller");
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
const middlewareRole = require("../../middlewares/admin/role.middleware");
router.get("/general", middlewareRole.editSetting, controller.general);

router.patch(
  "/general",
  middlewareRole.editSetting,
  upload.single("logo"),
  uploadCloud.upload,
  controller.generalPatch
);

module.exports = router;
