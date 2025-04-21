const axios = require("axios");
const { User } = require("../models/user");

const TU_API_URL = "https://restapi.tu.ac.th/api/v1/auth/Ad/verify";

// ทำการ login ผ่าน TU API
const loginWithTUAPI = async (req, res) => {
  const { studentId, citizenId } = req.body;

  try {
    // ส่งข้อมูลไป TU API
    const response = await axios.post(TU_API_URL, { studentId, citizenId });

    if (response.data.status !== "success") {
      return res.status(400).json({ error: "ไม่พบข้อมูลผู้ใช้" });
    }

    // หา user จากฐานข้อมูล
    let user = await User.findOne({ studentId });
    if (!user) {
      // ถ้าไม่พบ user ก็จะเพิ่มใหม่
      user = new User({
        studentId,
        username: response.data.username, // สมมติว่า TU API ส่ง username มาด้วย
        displayName: "",
        campus: response.data.campus, // สมมติว่า TU API ส่ง campus
      });
      await user.save();
    }

    // ส่งข้อมูลกลับ
    res.status(200).json({ message: "ล็อกอินสำเร็จ", user });
  } catch (err) {
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการล็อกอิน" });
  }
};

module.exports = { loginWithTUAPI };
