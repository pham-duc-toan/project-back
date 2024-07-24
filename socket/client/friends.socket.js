const User = require("../../models/user.model");
const gener = require("../../helpers/generate");
module.exports = (res) => {
  try {
    const myId = res.locals.user.id;

    _io.once("connection", (socket) => {
      //TOI GUI LOI MOI CHO NGUOI KHAC
      socket.on("CLIENT_SEND_REQUEST_ADD_FRIEND", async (data) => {
        //cập nhật database

        const { userTarget } = data;
        const nguoinhanBefore = await User.findOne({
          _id: userTarget,
          deleted: false,
          status: "active",
        });

        if (nguoinhanBefore && nguoinhanBefore.requestFromMe.includes(myId)) {
          const roomId = gener.generateRandomString(30);
          await User.updateOne(
            {
              _id: myId,
            },
            {
              $pull: {
                requestToMe: userTarget,
              },
              $push: {
                listFriend: {
                  room_id: roomId,
                  friend_id: userTarget,
                },
              },
            }
          );
          await User.updateOne(
            {
              _id: userTarget,
            },
            {
              $pull: {
                requestFromMe: myId,
              },
              $push: {
                listFriend: {
                  room_id: roomId,
                  friend_id: myId,
                },
              },
            }
          );
        } else {
          await User.updateOne(
            {
              _id: myId,
            },
            {
              $push: { requestFromMe: userTarget },
            }
          );
          await User.updateOne(
            {
              _id: userTarget,
            },
            {
              $push: { requestToMe: myId },
            }
          );
        }

        const nguoiguiInfo = await User.findOne({
          _id: myId,
        }).select("id fullName avatar");
        const nguoinhanInfo = await User.findOne({
          _id: userTarget,
        }).select("id fullName avatar");

        //cập nhật giao diện cho người nhận

        _io.emit("UPDATE_DISPLAY_AFTER_REQUEST_ADD", {
          nguoigui: myId,
          nguoinhan: userTarget,
          nguoiguiInfo,
          nguoinhanInfo,
        });
      });
      //TÔI HỦY LỜI MỜI KẾT BẠN VỚI NGƯỜI KHÁC
      socket.on("CLIENT_CANCEL_REQUEST_ADD_FRIEND", async (data) => {
        //cập nhật database
        const { userTarget } = data;
        await User.updateOne(
          {
            _id: myId,
          },
          {
            $pull: { requestFromMe: userTarget },
          }
        );
        await User.updateOne(
          {
            _id: userTarget,
          },
          {
            $pull: { requestToMe: myId },
          }
        );
        //cập nhật giao diện cho người nhận
        const nguoiguiInfo = await User.findOne({
          _id: myId,
        }).select("id fullName avatar");
        const nguoinhanInfo = await User.findOne({
          _id: userTarget,
        }).select("id fullName avatar");
        _io.emit("UPDATE_DISPLAY_AFTER_CANCEL_ADD", {
          nguoigui: myId,
          nguoinhan: userTarget,
          nguoiguiInfo,
          nguoinhanInfo,
        });
      });
      //TOI CHAP NHAN LOI MOI
      socket.on("CLIENT_SEND_ACCEPT_REQUEST", async (data) => {
        const { userTarget } = data;
        const roomId = gener.generateRandomString(30);

        const nguoigui = await User.findOneAndUpdate(
          { _id: myId },
          {
            $pull: { requestToMe: userTarget },
            $push: {
              listFriend: {
                room_id: roomId,
                friend_id: userTarget,
              },
            },
          },
          { new: true, fields: "id fullName avatar" }
        );

        const nguoinhan = await User.findOneAndUpdate(
          { _id: userTarget },
          {
            $pull: { requestFromMe: myId },
            $push: {
              listFriend: {
                room_id: roomId,
                friend_id: myId,
              },
            },
          },
          { new: true, fields: "id fullName avatar" }
        );

        _io.emit("UPDATE_DISPLAY_AFTER_ACCEPT", {
          nguoigui,
          nguoinhan,
        });
      });
      //TOI HUY CHAP NHAN LOI MOI
      socket.on("CLIENT_SEND_REFUSE_REQUEST", async (data) => {
        const { userTarget } = data;
        const nguoigui = await User.findOneAndUpdate(
          { _id: myId },
          { $pull: { requestToMe: userTarget } },
          { new: true, fields: "id fullName avatar" }
        );

        const nguoinhan = await User.findOneAndUpdate(
          { _id: userTarget },
          { $pull: { requestFromMe: myId } },
          { new: true, fields: "id fullName avatar" }
        );

        _io.emit("UPDATE_DISPLAY_AFTER_REFUSE", {
          nguoigui,
          nguoinhan,
        });
      });
    });
  } catch (error) {
    console.log(error);
  }
};
