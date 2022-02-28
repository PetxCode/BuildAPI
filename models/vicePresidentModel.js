const mongoose = require("mongoose");

const vote = mongoose.Schema({
  who: {
    type: String
  },
  toggle: {
    type: Boolean
  }
});

const vicePresidentModel = mongoose.Schema(
  {
    name: {
      type: String
    },
    position: {
      type: String,
      default: "VP/Secretary"
    },
    avatar: {
      type: String
    },
    voteCount: [vote]
  },
  { timestamps: true }
);

module.exports = mongoose.model("vice_presidents", vicePresidentModel);
