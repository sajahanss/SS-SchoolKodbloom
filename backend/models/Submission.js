const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  assignmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  studentName: String,
  studentRoll: String,
  className: String,
  section: String,
  fileUrl: String,
  uploadedAt: Date,
});

module.exports = mongoose.model('Submission', submissionSchema);
