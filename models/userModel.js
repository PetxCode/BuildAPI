const mongoose = require("mongoose");

const userModel = mongoose.Schema(
  {
    name: {
      type: String
    },
    email: {
      type: String,
      unique: true
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    password: {
      type: String
    },
    avatar: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", userModel);
