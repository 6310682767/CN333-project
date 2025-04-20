const express = require("express");
const { loginWithTUAPI } = require("../controllers/authController"); // เราจะใช้ controller ที่ทำงานร่วมกับ TU API
const { User } = require("../models/user");

const router = express.Router();

// ✅ Login with TU API
router.post("/login", loginWithTUAPI);

// ✅ Set Display Name
router.post("/set-display-name", async (req, res) => {
  const { userId, displayName } = req.body;

  // ตรวจสอบว่าชื่อแสดงมีอยู่แล้วหรือไม่
  const existingUser = await User.findOne({ displayName });
  if (existingUser) {
    return res.status(400).json({ error: "ชื่อผู้ใช้นี้มีผู้ใช้แล้ว" });
  }

  // อัปเดต displayName
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { displayName },
      { new: true }
    );
    res.status(200).json({ message: "ชื่อแสดงถูกตั้งเรียบร้อยแล้ว", user });
  } catch (err) {
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการอัปเดตชื่อแสดง" });
  }
});

module.exports = router;
