const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const dbConnection = require("./../db/mongoose");

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
        timestamps: { createdAt: true }
    }
);

module.exports = mongoose.model("Message", MessageSchema);