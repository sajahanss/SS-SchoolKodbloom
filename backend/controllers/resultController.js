// controllers/resultController.js
const Result = require('../models/Result');
const Student = require('../models/Student');

// ✅ Add Result by roll number
exports.addResult = async (req, res) => {
  try {
    const {
      rollno,
      className,
      section,
      subject,
      marksObtained,
      totalMarks,
      grade,
      examDate,
      remarks
    } = req.body;

    // 🔎 Check required fields
    if (!rollno || !className || !section || !subject || !marksObtained || !totalMarks) {
      return res.status(400).json({ message: "⚠️ All required fields must be filled." });
    }

    // 🔎 Check if student exists with given rollno
    const studentExists = await Student.findOne({ rollno });
    if (!studentExists) {
      return res.status(404).json({ message: "⚠️ Student not found with provided roll number." });
    }

    // ✅ Create new result
    const newResult = new Result({
      rollno,
      className,
      section,
      subject,
      marksObtained,
      totalMarks,
      grade: grade || '',
      examDate: examDate || new Date(),
      remarks: remarks || ''
    });

    const savedResult = await newResult.save();

    res.status(201).json({
      message: "✅ Result added successfully.",
      result: savedResult
    });

  } catch (err) {
    console.error("❌ Error adding result:", err.message);
    res.status(500).json({ message: "❌ Failed to add result. Please try again later." });
  }
};
