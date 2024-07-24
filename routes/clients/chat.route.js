const express = require("express");
const router = express.Router();

const controller = require("../../controller/clients/chat.controller");
const chatMiddleware = require("../../middlewares/client/chat.middleware");
router.get("/rooms-chat", controller.roomChat);
router.get("/rooms-chat/create", controller.create);
router.post("/rooms-chat/create", controller.createPost);
router.get("/inroom/:room_id", chatMiddleware, controller.index);

module.exports = router;
