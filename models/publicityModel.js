const mongoose = require("mongoose");

const vote = mongoose.Schema({
  who: {
    type: String
  },
  toggle: {
    type: Boolean
  }
});

const publicityModel = mongoose.Schema(
  {
    name: {
      type: String
    },
    position: {
      type: String,
      default: "Program Coordinator/Publicity"
    },
    avatar: {
      type: String
    },
    voteCount: [vote]
  },
  { timestamps: true }
);

module.exports = mongoose.model("publicities", publicityModel);
