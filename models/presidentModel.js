const mongoose = require("mongoose");

const vote = mongoose.Schema({
  who: {
    type: String
  },
  toggle: {
    type: Boolean
  }
});

const presidentModel = mongoose.Schema(
  {
    name: {
      type: String
    },
    position: {
      type: String,
      default: "President"
    },
    avatar: {
      type: String
    },
    voteCount: [vote]
  },
  { timestamps: true }
);

module.exports = mongoose.model("presidents", presidentModel);
