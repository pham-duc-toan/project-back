const User = require("../../models/user.model");
const Chat = require("../../models/chat.model");
const bufferToLinkOnlineByCloudinary = require("../../helpers/bufferToLinkOnlineCloudinary");
module.exports = async (res) => {
  _io.once("connection", (socket) => {
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
      });
      // await newChat.save();

      _io.emit("SERVER_RETURN_MESSAGE", {
        fullName: res.locals.user.fullName,
        content: data.content,
        images: images,
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
};
