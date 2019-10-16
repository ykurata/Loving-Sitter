const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema(
    {
        conversationId :  {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Conversation"
        },
        userId : {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        body : {
            type: String
        }
    },
    {
        timestamp: true
    }
);

const Message = mongoose.model("Message", MessageSchema);
module.exports = Message;