const Chat = require("../../models/chat.model");
const User = require("../../models/user.model");
// [GET] /chat/
module.exports.index = async (req, res) => {
  const userId = res.locals.user.id;
  const fullName = res.locals.user.fullName;
  const chats = await Chat.find({ deleted: false });

  //soket
  _io.once("connection", (socket) => {
    //chat basic
    socket.on("CLIENT_SEND_MESSAGE", async (data) => {
      const newChat = new Chat({
        user_id: userId,
        content: data.content,
        images: data.images,
        fullNameUser: fullName,
      });
      await newChat.save();

      _io.emit("SERVER_RETURN_MESSAGE", {
        fullName: res.locals.user.fullName,
        content: data.content,
        images: data.images,
        idSendMess: res.locals.user.id,
      });
    });
    //end chat basic
    //typing
    socket.on("CLIENT_SEND_TYPING", async (type) => {
      socket.broadcast.emit("SERVER_RETURN_TYPING", {
        userId: userId,
        fullName: fullName,
        type: type,
      });
    });
    //end typing
  });

  //end soket

  res.render("clients/page/chat/index", {
    pageTitle: "Chat",
    chats: chats,
  });
};
