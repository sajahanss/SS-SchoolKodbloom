const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const studentController = require('../controllers/studentController');
const Student = require('../models/Student');
const Result = require('../models/Result'); // Importing Result model to show student results

// ✅ Multer config for profile image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9) + ext;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

// ✅ Student Routes

// 🧑‍🎓 Login student
router.post('/login', studentController.loginStudent);

// 🔍 Get student details by roll number
router.get('/roll/:rollno', async (req, res) => {
  try {
    const student = await Student.findOne({ rollno: req.params.rollno });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (err) {
    console.error("❌ Error fetching student:", err.message);
    res.status(500).json({ message: "Error fetching student", error: err.message });
  }
});

// 📚 Get all students by class and section
router.get('/class/:className/:section', studentController.getStudentsByClassSection);

// 📄 Get all students
router.get('/', studentController.getAllStudents);

// ➕ Add a new student (with profile image upload)
router.post('/add', upload.single('profileImage'), studentController.addStudent);

// ❌ Delete a student by ID
router.delete('/:id', studentController.deleteStudent);

// Get student by ID
router.get('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (err) {
    console.error('Error fetching student by ID:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// ✅ Get Results for a specific student by roll number
router.get('/:rollno/results', async (req, res) => {
  try {
    const rollno = req.params.rollno;
    const results = await Result.find({ rollno });

    if (!results || results.length === 0) {
      return res.status(404).json({ message: "No results found for this roll number" });
    }

    res.status(200).json(results);
  } catch (err) {
    console.error("❌ Error fetching results:", err.message);
    res.status(500).json({ message: "Error fetching results", error: err.message });
  }
});

module.exports = router;
