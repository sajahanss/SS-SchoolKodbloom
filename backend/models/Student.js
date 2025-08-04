const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  rollno: String,
  email: String,
  password: String,
  className: String,     // ✅ Required for subjects
  section: String,       // ✅ Required for subjects
  profileImage: String,
});

module.exports = mongoose.model("Student", studentSchema);
