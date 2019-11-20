const mongoose = require("mongoose");
const Schema = mongoose.Schema;
import dbConnection from "./../db/mongoose";

const ConversationSchema = new Schema(
    {
        members :  [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }]
    }
);

// ConversationSchema.pre("save", function(next) {
//     mongoose.models["Conversation"].findOne({ members: this.members }, function(err, results){
//         if (err) {
//             next(err);
//         } else if (results) {
//             next(new Error("The conversation already exists"));
//         } else {
//             next();
//         }
//     });
// });

module.exports = dbConnection.model("Conversation", ConversationSchema);