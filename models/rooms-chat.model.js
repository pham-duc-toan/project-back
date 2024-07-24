const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    title: String,
    room_chat_id: String,
    avatar: String,
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  { timestamps: true }
);

const Room = mongoose.model("Room", roomSchema, "rooms");

module.exports = Room;
