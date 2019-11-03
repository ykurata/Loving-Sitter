var socket_io = require('socket.io');
var io = socket_io();
var socketApi = {};
var Profile = require('../models/Profile');
var Message = require('../models/Message');

socketApi.io = io;

io.on('connection', function(socket){
    console.log('A user connected');

    socket.on("message", function(msg){
      Profile.find({ userId: msg.recipientId }, function(err, profile) {
        if (err) {
          console.log(err);
        }

        const newMessage = new Message({
          conversationId : msg.conversationId,
          userId: profile.userId,
          body: msg.body
        });

        newMessage.save().then(() => {
          Message.find({ conversationId: msg.conversationId })
            .sort('createdAt')
            .limit(100)
            .populate('userId', 'name')
            .exec(function(err, messages){
              if (err) {
                console.log(err);
              }
              console.log(messages);
              return io.emit('message', messages);
            });
        });
      });
    });  
});

module.exports = socketApi;