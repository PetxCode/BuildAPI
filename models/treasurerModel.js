const mongoose = require("mongoose");

const vote = mongoose.Schema({
  who: {
    type: String
  },
  toggle: {
    type: Boolean
  }
});

const treasurerModel = mongoose.Schema(
  {
    name: {
      type: String
    },
    position: {
      type: String,
      default: "Treasurer/Chief Whip"
    },
    avatar: {
      type: String
    },
    voteCount: [vote]
  },
  { timestamps: true }
);

module.exports = mongoose.model("treasurers", treasurerModel);
