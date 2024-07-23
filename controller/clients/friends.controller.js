const User = require("../../models/user.model");
const socketFriend = require("../../socket/client/friends.socket");
//[GET] /friends
module.exports.index = async (req, res) => {
  socketFriend(res);
  const friendsData = res.locals.user.listFriend;
  let friends = [];
  for (const friend of friendsData) {
    const friendInfo = await User.findOne({
      _id: friend.user_id,
      deleted: false,
      status: "active",
    }).select("id avatar fullName");
    if (friendInfo) {
      friends.push(friendInfo);
    }
  }
  res.render("clients/page/friends/index.pug", {
    listUsers: friends,
  });
};
//[GET] /friends/not-friend
module.exports.friendSuggest = async (req, res) => {
  socketFriend(res);
  let listFilter = [];
  listFilter.push(res.locals.user.id);
  const friendsData = res.locals.user.listFriend;
  for (const friend of friendsData) {
    listFilter.push(friend.user_id);
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
};
//[GET] /friends/request-from-me
module.exports.requestFromMe = async (req, res) => {
  socketFriend(res);
  const listUsers = await User.find({
    _id: { $in: res.locals.user.requestFromMe },
  }).select("id avatar fullName");
  res.render("clients/page/friends/request-from-me.pug", {
    listUsers: listUsers,
  });
};
//[GET] /friends/request-to-me

module.exports.requestToMe = async (req, res) => {
  socketFriend(res);
  const listUsers = await User.find({
    _id: { $in: res.locals.user.requestToMe },
  }).select("id avatar fullName");
  res.render("clients/page/friends/request-to-me.pug", {
    listUsers: listUsers,
  });
};
