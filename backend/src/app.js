const express = require("express");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const connectDB = require("./config/db");

dotenv.config();

// สร้าง app
const app = express();

// Middleware
app.use(express.json()); // ให้รองรับ JSON จาก body request

// Routes
app.use("/api/auth", authRoutes); // เชื่อมต่อกับ routes ของ auth
app.use("/api/posts", postRoutes); // เชื่อมต่อกับ routes ของ post

// เชื่อมต่อกับฐานข้อมูลแล้วเริ่มรันเซิร์ฟเวอร์
connectDB()
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`✅ Server running at http://0.0.0.0:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });

module.exports = app;
