// models/Attendance.js
const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  studentName: String,
  status: {
    type: String,
    enum: ["Present", "Absent", "Leave"],
    default: "Absent",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const attendanceSchema = new mongoose.Schema({
  date: { type: String, required: true },
  className: String,
  section: String,
  subject: String,
  period: Number,
  timeSlot: String,
  teacherName: String,
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
  },
  records: [recordSchema],
});

module.exports = mongoose.model("Attendance", attendanceSchema);
