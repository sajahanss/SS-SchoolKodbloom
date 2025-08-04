const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Assignment = require('../models/Assignment');
const Submission = require('../models/Submission');

// ✅ Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/submissions'); // Ensure this folder exists
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname.replace(/\s+/g, '-');
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });


// ✅ Add new assignment (Teacher)
router.post('/add', async (req, res) => {
  const { title, description, dueDate, teacher, className, section } = req.body;

  if (!title || !description || !dueDate || !teacher || !className || !section) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newAssignment = new Assignment({
      title,
      description,
      dueDate,
      teacher,
      className,
      section,
    });

    await newAssignment.save();
    res.status(201).json({ message: '✅ Assignment added successfully' });
  } catch (error) {
    console.error('❌ Error adding assignment:', error.message);
    res.status(500).json({ message: 'Server error while adding assignment' });
  }
});


// ✅ Get assignments by class & section (Student)
router.get('/:className/:section', async (req, res) => {
  const { className, section } = req.params;

  try {
    const assignments = await Assignment.find({ className, section }).sort({ dueDate: 1 });
    res.json(assignments);
  } catch (err) {
    console.error("❌ Error fetching assignments:", err);
    res.status(500).json({ message: 'Server error while fetching assignments' });
  }
});


// ✅ Get assignments by query (optional route)
router.get('/student', async (req, res) => {
  const { className, section } = req.query;

  try {
    const assignments = await Assignment.find({ className, section }).sort({ dueDate: 1 });
    res.json(assignments);
  } catch (err) {
    console.error("❌ Error fetching assignments:", err);
    res.status(500).json({ message: 'Server error' });
  }
});


// ✅ Upload student submission
router.post('/upload/:assignmentId', upload.single('file'), async (req, res) => {
  const { assignmentId } = req.params;
  const { studentId, studentName, className, section } = req.body;

  if (!req.file) {
    console.error('❌ No file uploaded');
    return res.status(400).json({ message: 'No file uploaded' });
  }

  try {
    const existingSubmission = await Submission.findOne({ assignmentId, studentId });

    if (existingSubmission) {
      return res.status(409).json({ message: '⚠️ Assignment already submitted' });
    }

    const newSubmission = new Submission({
      assignmentId,
      studentId,
      studentName,
      className,
      section,
      filePath: req.file.filename,
      uploadedAt: new Date(),
    });

    await newSubmission.save();
    res.status(201).json({ message: '✅ Submission uploaded successfully', submission: newSubmission });
  } catch (err) {
    console.error('❌ Error uploading submission:', err.message);
    res.status(500).json({ message: 'Failed to upload submission' });
  }
});


// ✅ Check if a student has submitted a particular assignment
router.get('/submissions/check/:assignmentId/:studentId', async (req, res) => {
  const { assignmentId, studentId } = req.params;

  try {
    const submission = await Submission.findOne({ assignmentId, studentId });
    res.json({ submitted: !!submission });
  } catch (err) {
    console.error('❌ Error checking submission:', err.message);
    res.status(500).json({ message: 'Error checking submission' });
  }
});


// ✅ Get all submissions for a class/section (Teacher)
router.get('/submissions/:className/:section', async (req, res) => {
  const { className, section } = req.params;

  try {
    const submissions = await Submission.find({ className, section }).populate('assignmentId');
    res.json(submissions);
  } catch (err) {
    console.error('❌ Error fetching submissions:', err.message);
    res.status(500).json({ message: 'Server error while fetching submissions' });
  }
});

module.exports = router;
