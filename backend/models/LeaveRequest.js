const mongoose = require('mongoose');

const leaveRequestSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  className: String,
  section: String,
  fromDate: Date,
  toDate: Date,
  reason: String,
  typeOfLeave: { type: String, enum: ['SL', 'PL', 'CL'], required: true },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected', 'Cancelled'], default: 'Pending' },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
}, { timestamps: true });

module.exports = mongoose.model('LeaveRequest', leaveRequestSchema);
