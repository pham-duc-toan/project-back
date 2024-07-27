const User = require("../../models/user.model");
const socketFriend = require("../../socket/client/friends.socket");
//[GET] /friends
module.exports.index = async (req, res) => {
  try {
    socketFriend(res);
    const friendsData = res.locals.user.listFriend;
    let friends = [];
    for (const friend of friendsData) {
      const friendInfo = await User.findOne({
        _id: friend.friend_id,
        deleted: false,
        status: "active",
      }).select("id avatar fullName");
      if (friendInfo) {
        friendInfo.room_id = friend.room_id;
        friends.push(friendInfo);
      }
    }
    res.render("clients/page/friends/index.pug", {
      listUsers: friends,
    });
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};
//[GET] /friends/not-friend
module.exports.friendSuggest = async (req, res) => {
  try {
    socketFriend(res);
    let listFilter = [];
    listFilter.push(res.locals.user.id);
    const friendsData = res.locals.user.listFriend;
    for (const friend of friendsData) {
      listFilter.push(friend.friend_id);
    }

    const notFriends = await User.find({
      $and: [
        { _id: { $nin: listFilter } },
        { _id: { $nin: res.locals.user.requestFromMe } },
        { _id: { $nin: res.locals.user.requestToMe } },
      ],
    }).select("id avatar fullName");
    res.render("clients/page/friends/friendSuggest.pug", {
      listUsers: notFriends,
    });
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};
//[GET] /friends/request-from-me
module.exports.requestFromMe = async (req, res) => {
  try {
    socketFriend(res);
    const listUsers = await User.find({
      _id: { $in: res.locals.user.requestFromMe },
    }).select("id avatar fullName");
    res.render("clients/page/friends/request-from-me.pug", {
      listUsers: listUsers,
    });
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};
//[GET] /friends/request-to-me

module.exports.requestToMe = async (req, res) => {
  try {
    socketFriend(res);
    const listUsers = await User.find({
      _id: { $in: res.locals.user.requestToMe },
    }).select("id avatar fullName");
    res.render("clients/page/friends/request-to-me.pug", {
      listUsers: listUsers,
    });
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
};
