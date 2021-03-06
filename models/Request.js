const mongoose = require("mongoose");

const RequestSchema = mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    recieverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
    accepted: {
      type: Boolean,
      default: false
    },
    paid: {
      type: Boolean,
      default: false
    },
    createdAt : {
      type: Date,
      default: Date.now
    }
  }
);

module.exports = mongoose.model("Request", RequestSchema);
