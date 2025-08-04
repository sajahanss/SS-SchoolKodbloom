const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  subjectName: {
    type: String,
    required: true,
    trim: true,
  },
  className: {
    type: String,
    required: true,
    trim: true,
  },
  section: {
    type: String,
    required: true,
    trim: true,
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
}, {
  timestamps: true // adds createdAt and updatedAt
});

module.exports = mongoose.model("Subject", subjectSchema);
