const express = require("express");
const router  = express.Router();

const controller = require("../../controller/clients/checkout.controller");

router.get("/", controller.index);
router.post("/order", controller.order);
module.exports = router;