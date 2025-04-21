const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

dotenv.config();

// สร้าง app
const app = express();

// เชื่อมต่อ MongoDB
connectDB();

// Middleware
app.use(express.json()); // ให้รองรับ JSON จาก body request

// Routes
app.use("/api/auth", authRoutes); // เชื่อมต่อกับ routes ของ auth

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// npybird AV5yghNaKa64y1KI
