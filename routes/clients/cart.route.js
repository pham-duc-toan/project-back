const express = require("express");
const router  = express.Router();

const controller = require("../../controller/clients/cart.controller");
router.get("/", controller.index);
router.get("/delete/:productId", controller.delete);
router.get("/update/:productId/:quantity", controller.update);
router.post("/add/:productId", controller.addPost);

module.exports = router;