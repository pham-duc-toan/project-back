const express = require("express");
const router = express.Router();
const controller = require("../../controller/clients/friends.controller");
router.get("/", controller.index);
router.get("/not-friend", controller.friendSuggest);
router.get("/request-from-me", controller.requestFromMe);
router.get("/request-to-me", controller.requestToMe);
module.exports = router;
