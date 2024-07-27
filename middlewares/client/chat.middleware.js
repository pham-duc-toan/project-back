module.exports = async (req, res, next) => {
  try {
    const room_chat = req.params.room_id;
    const myUser = res.locals.user;
    var myListRoom = [];
    for (const room of myUser.listFriend) {
      myListRoom.push(room.room_id);
    }
    myListRoom = [...myUser.listRoomChat, ...myListRoom];
    if (!myListRoom.includes(room_chat)) {
      res.redirect("/friends");
      return;
    }
    next();
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};
