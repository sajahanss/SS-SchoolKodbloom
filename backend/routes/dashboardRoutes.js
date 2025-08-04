const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const Subject = require('../models/Subject');

// ✅ Count Students
router.get('/students/count', async (req, res) => {
  try {
    const count = await Student.countDocuments();
    res.json({ count });
  } catch (err) {
    console.error('Error counting students:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// ✅ Count Teachers
router.get('/teachers/count', async (req, res) => {
  try {
    const count = await Teacher.countDocuments();
    res.json({ count });
  } catch (err) {
    console.error('Error counting teachers:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// ✅ Count Subjects
router.get('/subjects/count', async (req, res) => {
  try {
    const count = await Subject.countDocuments();
    res.json({ count });
  } catch (err) {
    console.error('Error counting subjects:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
