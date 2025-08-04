const express = require('express');
const router = express.Router();

const {
  addAttendance,
  getAttendanceByStudentId,
  getAllAttendance,
  markLeaveForDates, // ✅ Route for marking "Leave" on approved requests
} = require('../controllers/attendanceController');

// ✅ Add attendance (Teacher submits attendance)
router.post('/add', addAttendance);

// ✅ Mark attendance as "Leave" when leave request is approved
router.post('/mark-leave', markLeaveForDates);

// ✅ Get all attendance records (for admin/debugging or leave checks)
router.get('/', getAllAttendance);

// ✅ Get attendance records for a specific student
router.get('/student/:studentId', getAttendanceByStudentId);

module.exports = router;
