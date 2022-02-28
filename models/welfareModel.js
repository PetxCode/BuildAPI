const mongoose = require("mongoose");

const vote = mongoose.Schema({
  who: {
    type: String
  },
  toggle: {
    type: Boolean
  }
});

const welfareModel = mongoose.Schema(
  {
    name: {
      type: String
    },
    position: {
      type: String,
      default: "Fin Sec/Welfare"
    },
    avatar: {
      type: String
    },
    voteCount: [vote]
  },
  { timestamps: true }
);

module.exports = mongoose.model("welfares", welfareModel);
