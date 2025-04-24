// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Firebase configuration object ที่ได้จากขั้นตอนก่อนหน้า
const firebaseConfig = {
  apiKey: "AIzaSyC3IRPS06XXVkZmUEyZ4LKV6IkBtdv4idM",
  authDomain: "tu-talk-c9dbf.firebaseapp.com",
  projectId: "tu-talk-c9dbf",
  storageBucket: "tu-talk-c9dbf.firebasestorage.app",
  messagingSenderId: "250743752010",
  appId: "1:250743752010:web:0d217c7510678cfff92db3",
  measurementId: "G-R5CEV76Q9H",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the storage service
const storage = getStorage(app);

export { storage };
