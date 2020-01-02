import mongoose from "mongoose";
import dbConnection from "./../db/mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    token: {
      type: String
    },
    passwordHash: {
      type: String
    },
  },
  {
    timestamps: true
  }
);

module.exports = dbConnection.model("User", userSchema);
