// routes/resultRoutes.js
const express = require('express');
const router = express.Router();
const Result = require('../models/Result');

// POST: Add new result
router.post('/', async (req, res) => {
  const {
    studentName, // ✅ Receive studentName
    rollno,
    subject,
    marksObtained,
    totalMarks,
    grade,
    className,
    section,
    examDate,
    remarks
  } = req.body;

  try {
    const newResult = new Result({
      studentName,
      rollno,
      subject,
      marksObtained,
      totalMarks,
      grade,
      className,
      section,
      examDate,
      remarks
    });

    const savedResult = await newResult.save();
    res.status(201).json(savedResult);
  } catch (error) {
    console.error("Error saving result:", error.message);
    res.status(400).json({ message: "Failed to add result. Please check all fields." });
  }
});

// GET: Fetch all results
router.get('/', async (req, res) => {
  try {
    const results = await Result.find();
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch results.' });
  }
});

module.exports = router;
