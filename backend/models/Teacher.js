// 📁 models/Teacher.js
const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  className: String,
  section: String,
  subject: String, // ✅ Add this
  profileImage: String
}, { timestamps: true });

module.exports = mongoose.model("Teacher", teacherSchema);
