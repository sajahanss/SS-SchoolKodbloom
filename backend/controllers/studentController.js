// 📁 controllers/studentController.js

const Student = require('../models/Student');
const bcrypt = require('bcrypt');

// ✅ Login Student
exports.loginStudent = async (req, res) => {
  try {
    const { rollno, password } = req.body;

    if (!rollno?.trim() || !password?.trim()) {
      return res.status(400).json({ message: "Roll number and password are required" });
    }

    const student = await Student.findOne({ rollno: rollno.trim() });
    if (!student) {
      return res.status(401).json({ message: "Invalid roll number or password" });
    }

    const match = await bcrypt.compare(password.trim(), student.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid roll number or password" });
    }

    res.status(200).json({
      message: "✅ Login successful",
      student: {
        _id: student._id,
        name: student.name,
        rollno: student.rollno,
        email: student.email,
        className: student.className,
        section: student.section,
        profileImage: student.profileImage || ""
      }
    });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// ✅ Get students by class and section (with exact + case-insensitive matching)
exports.getStudentsByClassSection = async (req, res) => {
  try {
    const className = req.params.className.trim();
    const section = req.params.section.trim();

    const students = await Student.find({
      className: { $regex: `^${className}$`, $options: 'i' },
      section: { $regex: `^${section}$`, $options: 'i' }
    });

    if (students.length === 0) {
      return res.status(404).json({ message: "❗ No students found for this class and section" });
    }

    res.status(200).json(students);
  } catch (err) {
    console.error("❌ Error getting students by class/section:", err);
    res.status(500).json({ message: "Failed to fetch students" });
  }
};

// ✅ Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (err) {
    console.error("❌ Get all students error:", err);
    res.status(500).json({ message: "Failed to get students" });
  }
};

// ✅ Add student
exports.addStudent = async (req, res) => {
  try {
    const { name, rollno, email, password, className, section } = req.body;
    const profileImage = req.file ? req.file.filename : "";

    // 🔍 Check if student already exists
    const existingStudent = await Student.findOne({ rollno });
    if (existingStudent) {
      return res.status(409).json({ message: "Student already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const newStudent = new Student({
      name,
      rollno,
      email,
      password: hashed,
      className,
      section,
      profileImage
    });

    const saved = await newStudent.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("❌ Add student error:", err);
    res.status(500).json({ message: "Failed to add student" });
  }
};

// ✅ Delete student
exports.deleteStudent = async (req, res) => {
  try {
    const deleted = await Student.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ message: "Student deleted" });
  } catch (err) {
    console.error("❌ Delete student error:", err);
    res.status(500).json({ message: "Failed to delete student" });
  }
};

// ✅ Get student by roll number
exports.getStudentByRoll = async (req, res) => {
  try {
    const { rollno } = req.params;
    const student = await Student.findOne({ rollno });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(student);
  } catch (err) {
    console.error("❌ Error getting student by roll:", err);
    res.status(500).json({ message: "Failed to fetch student" });
  }
};
