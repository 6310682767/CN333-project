// authRoutes.js
const express = require("express");
const { loginWithTUAPI } = require("../controllers/authController"); // เราจะใช้ controller ที่ทำงานร่วมกับ TU API
const { User } = require("../models/user");
const { setDisplayName } = require("../controllers/authController");

const router = express.Router();

// ✅ Login with TU API
router.post("/login", loginWithTUAPI);

// ✅ Set Display Name
router.post("/set-display-name", async (req, res) => {
  const { username, displayName } = req.body;

  // ตรวจสอบว่าชื่อแสดงมีอยู่แล้วหรือไม่
  const existingUser = await User.findOne({ displayName });
  if (existingUser) {
    return res.status(400).json({ error: "ชื่อผู้ใช้นี้มีผู้ใช้แล้ว" });
  }

  // อัปเดต displayName
  try {
    const user = await User.findOneAndUpdate(
      { username }, // ค้นหาผู้ใช้โดยใช้ username (รหัสนักศึกษา)
      { displayName }, // อัปเดตชื่อแสดง
      { new: true } // ส่งข้อมูลผู้ใช้ที่อัปเดตแล้วกลับมา
    );
    if (!user) {
      return res.status(404).json({ error: "ไม่พบผู้ใช้ที่ต้องการอัปเดต" });
    }
    res.status(200).json({ message: "ชื่อแสดงถูกตั้งเรียบร้อยแล้ว", user });
  } catch (err) {
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการอัปเดตชื่อแสดง" });
  }
});

// ✅ Set Campus
router.post("/set-campus", async (req, res) => {
  const { username, campus } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { username },
      { campus },
      { new: true }
    );

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
