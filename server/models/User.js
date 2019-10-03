import mongoose from "mongoose";
import crypto from "crypto";
import dbConnection from "./../db/mongoose";

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: "First name is required"
    },
    lastName: {
      type: String,
      required: "Last name is required"
    },
    email: {
      type: String,
      required: "Email is required",
      unique: "Email already exists"
    },
    token: {
      type: String
    },
    passwordHash: {
      type: String
    },
    salt: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

function generatePassword(salt, password) {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, 1000, 128, "sha512", (err, key) => {
      if (err) return reject(err);
      resolve(key.toString("hex"));
    });
  });
}

function generateSalt() {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(128, (err, buffer) => {
      if (err) return reject(err);
      resolve(buffer.toString("hex"));
    });
  });
}

userSchema.methods.setPassword = async function setPassword(password) {
  this.salt = await generateSalt();
  this.passwordHash = await generatePassword(this.salt, password);
};

userSchema.methods.checkPassword = async function(password) {
  if (!password) return false;

  const hash = await generatePassword(this.salt, password);
  return hash === this.passwordHash;
};

module.exports = dbConnection.model("User", userSchema);
