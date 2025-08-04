const express = require('express');
const router = express.Router();
const {
  addTimeTable,
  getTimeTableByClassSection,
  getTimeTableByTeacher,
  getAllTimetables,
  bulkUploadTimeTable // ✅ include this
} = require('../controllers/timeTableController');

// Routes
router.get('/', getAllTimetables);
router.post('/add', addTimeTable);
router.get('/student/:className/:section', getTimeTableByClassSection);
router.get('/teacher/:teacherName', getTimeTableByTeacher);
router.post('/bulk-upload', bulkUploadTimeTable); // ✅ Bulk upload route

module.exports = router;
