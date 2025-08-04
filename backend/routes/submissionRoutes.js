const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');
const submissionController = require('../controllers/submissionController');
const Submission = require('../models/Submission');

// ✅ Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/submissions'));
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname.replace(/\s+/g, '-');
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// ✅ Routes
router.get('/check/:assignmentId/:studentId', submissionController.checkSubmission);
router.get('/:className/:section', submissionController.getSubmissionsByClass);
router.post('/upload/:assignmentId', upload.single('file'), submissionController.uploadSubmission);

// ✅ Fixed: Get all submissions for a specific assignment
router.get('/assignment/:assignmentId', async (req, res) => {
  const { assignmentId } = req.params;

  try {
    const submissions = await Submission.find({
      assignmentId: new mongoose.Types.ObjectId(assignmentId),
    }).populate('studentId');

    res.status(200).json(submissions);
  } catch (err) {
    console.error('❌ Error fetching submissions:', err.message);
    res.status(500).json({ message: 'Failed to get submissions' });
  }
});

module.exports = router;
