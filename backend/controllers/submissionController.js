// 📁 controllers/submissionController.js

const Submission = require('../models/Submission');

// ✅ Check if a student has submitted an assignment
exports.checkSubmission = async (req, res) => {
  const { assignmentId, studentId } = req.params;

  try {
    const submission = await Submission.findOne({ assignmentId, studentId });
    res.json({ submitted: !!submission });
  } catch (err) {
    console.error('❌ Error checking submission:', err.message);
    res.status(500).json({ message: 'Error checking submission' });
  }
};

// ✅ Get all submissions by class and section (used by Teacher)
exports.getSubmissionsByClass = async (req, res) => {
  const { className, section } = req.params;

  try {
    const submissions = await Submission.find({ className, section })
      .populate('assignmentId', 'title description dueDate') // only useful fields
      .sort({ uploadedAt: -1 }); // latest first

    res.status(200).json(submissions);
  } catch (err) {
    console.error('❌ Error fetching submissions:', err.message);
    res.status(500).json({ message: 'Server error while fetching submissions' });
  }
};

// ✅ Upload a new submission (used by Student)
exports.uploadSubmission = async (req, res) => {
  const { assignmentId } = req.params;
  const { studentId, studentName, studentRoll, className, section } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: '❌ No file uploaded' });
  }

  if (!studentId || !studentName || !studentRoll || !className || !section) {
    return res.status(400).json({ message: '❌ Missing required student information' });
  }

  try {
    // prevent duplicate submission
    const existing = await Submission.findOne({ assignmentId, studentId });
    if (existing) {
      return res.status(409).json({ message: '⚠️ You have already submitted this assignment' });
    }

    const newSubmission = new Submission({
      assignmentId,
      studentId,
      studentName,
      studentRoll,
      className,
      section,
      fileUrl: req.file.filename,
      uploadedAt: new Date()
    });

    await newSubmission.save();

    res.status(201).json({
      message: '✅ Submission uploaded successfully',
      submission: newSubmission
    });
  } catch (err) {
    console.error('❌ Error uploading submission:', err.message);
    res.status(500).json({ message: 'Failed to upload submission' });
  }
};
