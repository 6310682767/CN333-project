const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "ไม่พบ Token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // ใส่ข้อมูลผู้ใช้ที่ตรวจสอบแล้วใน request
    next(); // เรียกใช้ middleware ถัดไป
  } catch (error) {
    res.status(400).json({ error: "Token ไม่ถูกต้อง" });
  }
};

module.exports = { verifyToken };
