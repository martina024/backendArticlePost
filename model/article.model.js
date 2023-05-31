const mongoose = require("mongoose");

const articleSchema = mongoose.Schema(
  {
    title: String,
    body: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    versionKey: false,
  }
);

const ArticleModel = mongoose.model("article", articleSchema);

module.exports = { ArticleModel };
