const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    studentId: { type: String, required: true, unique: true },
    studentName: { type: String, required: true },
    displayName: { type: String, required: true, default: "" },
    campus: { type: String, required: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = { User };
