const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConversationSchema = new Schema(
    {
        members :  [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }]
    }
);

module.exports = mongoose.model("Conversation", ConversationSchema);