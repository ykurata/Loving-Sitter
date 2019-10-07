const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RequestSchema = new Schema(
    {
        userId: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        requestedUserId: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        startTime: {
            type: Date
        },
        endTime: {
            type: Date
        },
        accepted: {
            type: Boolean,
            default: false
        },
        paid: {
            type: Boolean,
            default: false
        }
    } 
);

module.export = mongoose.model("Request", RequestSchema);
