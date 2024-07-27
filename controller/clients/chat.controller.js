const Chat = require("../../models/chat.model");
const User = require("../../models/user.model");
const Room = require("../../models/rooms-chat.model");
const chatSocket = require("../../socket/client/chat.socket");
const generation = require("../../helpers/generate");
// [GET] /chat/inroom/:room_id
module.exports.index = async (req, res) => {
  try {
    const room_chat = req.params.room_id;
    chatSocket(res, room_chat);
    const chats = await Chat.find({
      deleted: false,
      room_chat_id: room_chat,
    });
    res.render("clients/page/chat/index", {
      pageTitle: "Chat",
      chats: chats,
    });
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};
// [GET] /chat/rooms-chat
module.exports.roomChat = async (req, res) => {
  try {
    const myUser = res.locals.user;
    var roomsChat = [];
    for (const id of myUser.listRoomChat) {
      const roomInfo = await Room.findOne({
        room_chat_id: id,
      }).select("title id avatar room_chat_id");
      roomsChat.push(roomInfo);
    }

    res.render("clients/page/chat/rooms-chat", {
      pageTitle: "Danh sách phòng chat",
      roomsChat,
    });
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};
// [GET] /chat/rooms-chat/create
module.exports.create = async (req, res) => {
  try {
    const myUser = res.locals.user;
    const listFriend = [];
    for (const element of myUser.listFriend) {
      const friendInfo = await User.findOne({
        _id: element.friend_id,
      }).select("fullName id");
      listFriend.push(friendInfo);
    }
    res.render("clients/page/chat/create-room", {
      pageTitle: "Danh sách phòng chat",
      listFriend: listFriend,
    });
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};
// [POST] /chat/rooms-chat/create
module.exports.createPost = async (req, res) => {
  try {
    const generateRoomId = generation.generateRandomString(29);
    await User.updateOne(
      {
        _id: res.locals.user.id,
      },
      {
        $push: {
          listRoomChat: generateRoomId,
        },
      }
    );

    if (req.body.length) {
      for (const user of req.body.userId) {
        console.log(req.body.userId);
        await User.updateOne(
          {
            _id: user,
          },
          {
            $push: {
              listRoomChat: generateRoomId,
            },
          }
        );
      }
    } else {
      await User.updateOne(
        {
          _id: req.body.userId,
        },
        {
          $push: {
            listRoomChat: generateRoomId,
          },
        }
      );
    }

    const newRoom = new Room({
      title: req.body.title,
      room_chat_id: generateRoomId,
      avatar: req.body.avatar || "",
    });
    newRoom.save();
    res.redirect(`/chat/inroom/${generateRoomId}`);
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};
