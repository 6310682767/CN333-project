const axios = require("axios");
const { User } = require("../models/user");

const TU_API_URL = "https://restapi.tu.ac.th/api/v1/auth/Ad/verify";

// ทำการ login ผ่าน TU API
const loginWithTUAPI = async (req, res) => {
  const { username, password } = req.body;

  console.log("📤 ส่งข้อมูลไป TU API:", {
    UserName: username,
    PassWord: password,
  });

  try {
    // ส่งข้อมูลไป TU API
    const response = await axios.post(
      TU_API_URL,
      { UserName: username, PassWord: password },
      {
        headers: {
          "Content-Type": "application/json",
          "Application-Key":
            "TUc92ac9800ebb78fa4e7a8b0adbed88c29121fb7988c0a29ae3d5c6026e27fa6c510d2d6a5eceeee7fb64f2f478b94015",
        },
      }
    );

    console.log("📦 TU Response:", response.data);

    if (!response.data.status) {
      return res.status(400).json({ error: "ไม่พบข้อมูลผู้ใช้" });
    }

    // หา user จากฐานข้อมูล
    console.log("📥 กำลังตรวจสอบผู้ใช้ในฐานข้อมูล...");
    let user = await User.findOne({ username });
    if (!user) {
      // ถ้าไม่พบ user ก็จะเพิ่มใหม่
      console.log("📥 ไม่พบผู้ใช้, กำลังเพิ่มข้อมูล...");
      user = new User({
        username: response.data.username, // TU API ส่ง username มา
        studentNameTh: response.data.displayname_th, // TU API ส่ง displayName มา
        studentNameEn: response.data.displayname_en, // TU API ส่ง displayName มา
        displayName: "", // ชื่อแสดงจะถูกตั้งใน frontend
        campus: "", // วิทยาเขตจะถูกตั้งใน frontend
        email: response.data.email, // TU API ส่ง email มา
        department: response.data.department, // TU API ส่ง department มา
        faculty: response.data.faculty, // TU API ส่ง faculty มา
      });
      console.log("TU API Keys: ", Object.keys(response.data));
      console.log("📥 กำลังบันทึกผู้ใช้ในฐานข้อมูล:", user);
      try {
        await user.save();
        console.log("📥 บันทึกผู้ใช้สำเร็จ");
      } catch (err) {
        console.error("❌ ข้อผิดพลาดในการบันทึกข้อมูลผู้ใช้:", err.message);
      }
      console.log("📥 บันทึกผู้ใช้สำเร็จ");
    }

    // ส่งข้อมูลกลับ
    res.status(200).json({ message: "ล็อกอินสำเร็จ", user });
  } catch (err) {
    console.error("❌ Login Error:", err.message);
    if (err.response) {
      console.error("📨 TU API Error Response:", err.response.data);
    }
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการล็อกอิน" });
  }
};

module.exports = { loginWithTUAPI };
