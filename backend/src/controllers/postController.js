// postController.js
const Post = require("../models/Post");
const { uploadFileToFirebase } = require("../utils/firebase");

// ดึงโพสต์
exports.getFilteredPosts = async (req, res) => {
  try {
    const { filter = "latest", campus, community } = req.query;

    // กรองตาม campus/community ถ้ามี
    let query = {};
    if (campus) query.campus = campus;
    if (community) query.community = community;

    // ดึงโพสต์จากฐานข้อมูล พร้อมจัดเรียงตาม filter
    let postsQuery = Post.find(query);

    // filter ตามที่เลือก
    if (filter === "latest") {
      postsQuery = postsQuery.sort({ createdAt: -1 }); // ใช้ sort เพื่อจัดเรียงล่าสุด
    } else if (filter === "popular") {
      postsQuery = postsQuery.sort({ likes: -1 }); // ใช้ sort ตาม likes
    } else if (filter === "starred") {
      postsQuery = postsQuery.where("starred").equals(true); // คัดกรองโพสต์ที่เป็น starred
    } else if (filter === "personalized") {
      // ใส่ logic ผู้ใช้ทีหลัง เช่นตามความสนใจ
      postsQuery = postsQuery.limit(10); // mock ไว้ก่อน
    }

    // ดึงโพสต์ทั้งหมดที่ตรงกับเงื่อนไข
    const posts = await postsQuery.exec();

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// สร้างโพสต์
exports.createPost = async (req, res) => {
  console.log("📥 เข้ามาที่ createPost แล้ว");
  try {
    const { content, community, target, authorName } = req.body;
    const files = req.files;

    let imageUrls = [];
    let videoUrls = [];

    // อัปโหลดภาพ
    if (files?.images) {
      imageUrls = await Promise.all(
        files.images.map(
          async (file) =>
            await uploadFileToFirebase(
              file.buffer,
              file.originalname,
              file.mimetype,
              "images"
            )
        )
      );
    }

    // อัปโหลดวิดีโอ
    if (files?.videos) {
      videoUrls = await Promise.all(
        files.videos.map(
          async (file) =>
            await uploadFileToFirebase(
              file.buffer,
              file.originalname,
              file.mimetype,
              "videos"
            )
        )
      );
    }

    const newPost = new Post({
      content,
      community,
      target,
      authorName,
      images,
      videos,
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "เกิดข้อผิดพลาดในการสร้างโพสต์" });
  }
};
