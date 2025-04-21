const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true }, // รหัสนักศึกษา
    studentNameTh: { type: String, required: true }, // ชื่อ-นามสกุล ภาษาไทย
    studentNameEn: { type: String, required: true }, // ชื่อ-นามสกุล ภาษาอังกฤษ
    displayName: { type: String, default: "" }, // ชื่อแสดง
    campus: { type: String, default: "" }, // วิทยาเขต
    email: { type: String, default: "" }, // อีเมล
    department: { type: String, default: "" }, // สาขา
    faculty: { type: String, default: "" }, // คณะ
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = { User };
