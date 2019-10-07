const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RequestSchema = new Schema({
    requestFrom: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    requestTo: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
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
    }
});

module.exports = mongoose.model("Request", RequestSchema);