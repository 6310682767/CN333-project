// backend/src/server.js
const app = require("./app");
const connectDB = require("./config/db");

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
