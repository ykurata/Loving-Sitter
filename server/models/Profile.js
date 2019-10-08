const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  userId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  photo: {
    data: Buffer, 
    contentType: String 
  },
  gender: {
    type: String,
    required: true
  },
  birthDate: {
    type: Date,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: Number
  },
  location: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Profile", ProfileSchema);
