import mongoose from ("mongoose");
import dbConnection from "./../db/mongoose";

const RequestSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        requestedUserId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        startDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date,
            required: true
        },
        status : {
            type: String
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
