// backend/src/middleware/validateDisplayName.js
const Filter = require("bad-words");

const SPECIAL_CHAR_REGEX = /[^\w\s]/;
const THAI_CHAR_REGEX = /[\u0E00-\u0E7F]/;

module.exports = async (req, res, next) => {
  const { displayName } = req.body;
  const filter = new Filter();

  if (!displayName || displayName.trim() === "") {
    return res.status(400).json({ message: "กรุณาใส่ชื่อแสดง" });
  }

  if (displayName.length > 20) {
    return res.status(400).json({ message: "ชื่อยาวเกิน 20 ตัวอักษร" });
  }

  if (filter.isProfane(displayName.toLowerCase())) {
    return res.status(400).json({ message: "ชื่อมีคำไม่สุภาพ" });
  }

  if (SPECIAL_CHAR_REGEX.test(displayName)) {
    return res.status(400).json({ message: "ห้ามใช้อักขระพิเศษหรืออีโมจิ" });
  }

  if (THAI_CHAR_REGEX.test(displayName)) {
    return res.status(400).json({ message: "ห้ามใช้ภาษาไทย" });
  }

  next();
};
