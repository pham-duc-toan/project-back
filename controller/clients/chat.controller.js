const Chat = require("../../models/chat.model");
const User = require("../../models/user.model");
// [GET] /chat/
module.exports.index = async (req, res) => {
  const userId = res.locals.user.id;
  const chats = await Chat.find({ deleted: false });

  //soket
  _io.once("connection", (socket) => {
    socket.emit("SERVER_RETURN_ID", res.locals.user.id);
    socket.on("CLIENT_SEND_MESSAGE", async (data) => {
      const fullNameUser = await User.findOne({ _id: userId }).select(
        "fullName"
      );

      const newChat = new Chat({
        user_id: userId,
        content: data,
        fullNameUser: fullNameUser.fullName,
      });
      await newChat.save();

      _io.emit("SERVER_RETURN_MESSAGE", {
        fullName: res.locals.user.fullName,
        content: data,
        idSendMess: res.locals.user.id,
      });
    });
  });

  //end soket

  res.render("clients/page/chat/index", {
    pageTitle: "Chat",
    chats: chats,
  });
};
