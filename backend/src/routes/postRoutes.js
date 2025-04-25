// postRoutes.js
const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const postController = require("../controllers/postController");

// GET: ดึงโพสต์
router.get("/", postController.getFilteredPosts);

// POST: สร้างโพสต์
router.post("/create", postController.createPost);

module.exports = router;
