const socket_io = require("socket.io");
const io = socket_io();
const socketApi = {};
const Profile = require("../models/Profile");
const Message = require("../models/Message");

socketApi.io = io;

io.on("connection", function (socket) {
  console.log("A user connected");

  socket.on("newMessage", function (msg) {
    io.emit("newMessage", msg);
  });

  socket.on("disconnect", function () {
    console.log("user disconnected");
  });
});

module.exports = socketApi;
