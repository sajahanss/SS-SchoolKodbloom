// models/Result.js
const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  studentName: { type: String, required: true }, // ✅ Added this line
  rollno: { type: String, required: true },
  subject: { type: String, required: true },
  marksObtained: { type: Number, required: true },
  totalMarks: { type: Number, default: 100 },
  grade: { type: String },
  className: { type: String },
  section: { type: String },
  examDate: { type: Date },
  remarks: { type: String },
});

module.exports = mongoose.model('Result', resultSchema);
