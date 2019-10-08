import mongoose from ("mongoose");
import dbConnection from "./../db/mongoose";

const RequestSchema = mongoose.Schema(
    {
        userId: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            }
        ],
        requestedUserId: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            }
        ],
        startTime: {
            type: Date,
            required: true
        },
        endTime: {
            type: Date,
            required: true
        },
        accepted: {
            type: Boolean,
            default: false
        },
        paid: {
            type: Boolean,
            default: false
        },
    },
    {
        timestamp: true
    }
);

module.export = dbConnection.model("Request", RequestSchema);
