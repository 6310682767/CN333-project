const express = require("express");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");

dotenv.config();

// สร้าง app
const app = express();

// Middleware
app.use(express.json()); // ให้รองรับ JSON จาก body request

// Routes
app.use("/api/auth", authRoutes); // เชื่อมต่อกับ routes ของ auth
app.use("/api/posts", postRoutes); // เชื่อมต่อกับ routes ของ post

module.exports = app;
