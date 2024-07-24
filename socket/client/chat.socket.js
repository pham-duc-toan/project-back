const Chat = require("../../models/chat.model");
const bufferToLinkOnlineByCloudinary = require("../../helpers/bufferToLinkOnlineCloudinary");
module.exports = async (res, room_chat_id) => {
  _io.once("connection", (socket) => {
    socket.join(room_chat_id);
    //chat basic
    const userId = res.locals.user.id;
    const fullName = res.locals.user.fullName;
    socket.on("CLIENT_SEND_MESSAGE", async (data) => {
      const images = [];
      for (let image of data.images) {
        let link = await bufferToLinkOnlineByCloudinary(image);
        images.push(link);
      }
      const newChat = new Chat({
        user_id: userId,
        content: data.content,
        images: images,
        fullNameUser: fullName,
        room_chat_id: room_chat_id,
      });
      await newChat.save();

      _io.to(room_chat_id).emit("SERVER_RETURN_MESSAGE", {
        fullName: res.locals.user.fullName,
        content: data.content,
        images: images,
        idSendMess: res.locals.user.id,
      });
    });
    //end chat basic
    //typing
    socket.on("CLIENT_SEND_TYPING", async (type) => {
      socket.broadcast.to(room_chat_id).emit("SERVER_RETURN_TYPING", {
        userId: userId,
        fullName: fullName,
        type: type,
      });
    });
    //end typing
  });
};
