const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  content: String,
  campus: String, // eg: "rangsit", "thaPrachan"
  community: String, // eg: "cs", "it"
  likes: { type: Number, default: 0 },
  starred: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Post", postSchema);
