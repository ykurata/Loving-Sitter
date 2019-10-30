var socket_io = require('socket.io');
var io = socket_io();
var socketApi = {};
var Message = require('../models/Message');

socketApi.io = io;

io.on('connection', function(socket){
    console.log('A user connected');

    socket.on("message", function(msg){
      // io.emit("message", msg);
    
      const newMessage = new Message({
        conversationId : msg.conversationId,
        userId: msg.userId,
        body: msg.body
      });

      newMessage.save();

      Message.find({ conversationId: msg.conversationId })
        .limit(100)
        .exec(function(err, messages) {
          if (err) {
            console.log(err);
          } else {
            io.emit("message", msg);
          }
        });
    });  
});

module.exports = socketApi;