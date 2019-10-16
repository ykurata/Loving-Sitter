const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConversationSchema = new Schema(
    {
        senderId :  {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        recipientId : {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    }
);

const Conversation = mongoose.model("Conversation", ConversationSchema);
module.exports = Conversation;