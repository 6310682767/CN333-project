// post.js
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  content: String, // ข้อความโพสต์
  campus: String, // eg: "rangsit", "thaPrachan"
  community: String, // eg: "cs", "it"
  target: { type: String },
  authorName: String,
  authorAvatar: String, // URL ของภาพโปรไฟล์ผู้โพสต์
  images: [String], // URL ของภาพที่อัปโหลด
  videos: [String], // URL ของวิดีโอที่อัปโหลด
  likes: { type: Number, default: 0 },
  starred: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Post", postSchema);
