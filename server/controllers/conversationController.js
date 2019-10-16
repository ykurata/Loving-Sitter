import Conversation from "../models/Conversation";
import Message from "../models/Message";


// Create a conversation (new conversation)
module.exports = createConversation = function(req, res, next) {
    const conversation = new Conversation({
        senderId : req.user,
        recipientId : req.body.recipientId
    });
    if (!conversation.recipientId) {
        const err = new Error("Please select recipient");
        err.status = 400;
        next(err);
    } else {
        conversation.save(function(err, conversation){
            if (err) return next(err);
            res.json(conversation);
        });
    }
};


// Get all conversations
module.exports = getConversations = function(req, res, next) {
    Conversation.find({})
        .populate("senderId")
        .exec(function(err, conversations){
            if (err) return next(err);
            res.json(conversations);
        });
};


// CREATE /conversation/:conversation_id/message (new message)
module.exports = createMessage = function(req, res, next) {
    const message = new Message({
        conversationId: req.params.id,
        body = req.body.body
    });
    if (!message.conversationId) {
        const err = new Error("Please select conversation");
        err.status = 400;
        next(err);
    } else {
        message.save(function(err, message){
            if (err) return next(err);
            res.json(message);
        });
    }
};


// GET /conversation/:conversation_id (body list of messages sent already)
module.exports = getMessage = function(req, res, next) {
    Message.find({})
        .populate("conversationId")
        .exec(function(err, messages){
            if (err) return next(err);
            res.json(messages);
        });
};