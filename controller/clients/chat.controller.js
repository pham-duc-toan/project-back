const Chat = require("../../models/chat.model");
const User = require("../../models/user.model");
const bufferToLinkOnlineByCloudinary = require("../../helpers/bufferToLinkOnlineCloudinary");
const chatSocket = require("../../socket/client/chat.socket");
// [GET] /chat/
module.exports.index = async (req, res) => {
  chatSocket(res);

  const chats = await Chat.find({ deleted: false });
  res.render("clients/page/chat/index", {
    pageTitle: "Chat",
    chats: chats,
  });
};
