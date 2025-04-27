const { initializeApp, cert } = require("firebase-admin/app");
const { getStorage } = require("firebase-admin/storage");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

// ✅ เรียกใช้ Firebase Admin
initializeApp({
  credential: cert(serviceAccount),
  storageBucket: "tu-talk-c9dbf.firebasestorage.app",
});

const bucket = getStorage().bucket();

/**
 * อัปโหลดไฟล์ (ภาพหรือวิดีโอ) ขึ้น Firebase Storage
 */
const uploadFileToFirebase = async (
  buffer,
  filename,
  mimetype,
  folder = ""
) => {
  const uniqueName = `${folder}/${uuidv4()}-${filename}`;
  const file = bucket.file(uniqueName);

  await file.save(buffer, {
    metadata: {
      contentType: mimetype,
      metadata: {
        firebaseStorageDownloadTokens: uuidv4(), // ทำให้ URL โหลดได้
      },
    },
    public: true, // public URL
  });

  return `https://storage.googleapis.com/${bucket.name}/${file.name}`;
};

module.exports = { uploadFileToFirebase };
