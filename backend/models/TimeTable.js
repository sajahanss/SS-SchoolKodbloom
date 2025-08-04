const mongoose = require('mongoose');

const timeTableSchema = new mongoose.Schema({
  className: String,
  section: String,
  day: String,
  period: String, // e.g., "9:00 AM - 9:45 AM"
  subject: String,
  teacherName: String,
});

module.exports = mongoose.model('TimeTable', timeTableSchema);
