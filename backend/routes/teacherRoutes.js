// 📁 routes/teacherRoutes.js

const express = require('express');
const router  = express.Router();
const multer  = require('multer');
const path    = require('path');
const teacherController = require('../controllers/teacherController');

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads')),
  filename:    (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// ✅ Add Teacher
router.post('/add', upload.single('profileImage'), teacherController.addTeacher);

// ✅ Login Teacher
router.post('/login', teacherController.loginTeacher);

// ✅ Get teacher count — this must come BEFORE `/:id`
router.get('/count', teacherController.countTeachers);

// ✅ Get all Teachers
router.get('/', teacherController.getAllTeachers);

// ✅ Get students for a specific teacher
router.get('/:id/students', teacherController.getStudentsForTeacher);

// ✅ Get Teacher by ID
router.get('/:id', teacherController.getTeacherById);

// ✅ Delete Teacher by ID
router.delete('/:id', teacherController.deleteTeacher);

module.exports = router;
