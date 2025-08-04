// 📁 controllers/teacherController.js

const mongoose = require('mongoose');
const Teacher = require('../models/Teacher');
const bcrypt = require('bcrypt');
const Student = require('../models/Student');


// ➕ Add Teacher
exports.addTeacher = async (req, res) => {
  try {
    const { name, email, password, className, section, subject } = req.body;
    const profileImage = req.file?.filename || '';

    // Validation
    if (!name || !email || !password || !className || !section || !subject) {
      return res.status(400).json({ error: "All fields are required including subject" });
    }

    // Check if email already exists
    const existing = await Teacher.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newTeacher = new Teacher({
      name,
      email,
      password: hashedPassword,
      className,
      section,
      subject,         // ✅ Add subject
      profileImage
    });

    await newTeacher.save();

    res.status(201).json({
      message: "Teacher added successfully",
      teacher: {
        _id: newTeacher._id,
        name: newTeacher.name,
        email: newTeacher.email,
        className: newTeacher.className,
        section: newTeacher.section,
        subject: newTeacher.subject,
        profileImage: newTeacher.profileImage
      }
    });

  } catch (err) {
    console.error("❌ Error adding teacher:", err);
    res.status(500).json({ error: "Failed to add teacher" });
  }
};

// 🔐 Login Teacher
exports.loginTeacher = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const teacher = await Teacher.findOne({ email });
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    const isMatch = await bcrypt.compare(password, teacher.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
      message: "Login successful",
      teacher: {
        _id: teacher._id,
        name: teacher.name,
        email: teacher.email,
        className: teacher.className,
        section: teacher.section,
        subject: teacher.subject, // ✅ Return subject here
        profileImage: teacher.profileImage
      }
    });

  } catch (err) {
    console.error("❌ Error during login:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// 📋 Get all Teachers
exports.getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.status(200).json(teachers);
  } catch (err) {
    console.error("❌ Error fetching teachers:", err);
    res.status(500).json({ error: "Failed to fetch teachers" });
  }
};

// 🔍 Get Teacher by ID
exports.getTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.status(200).json(teacher);
  } catch (err) {
    console.error("❌ Error fetching teacher by ID:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// 🗑️ Delete Teacher
exports.deleteTeacher = async (req, res) => {
  try {
    const deleted = await Teacher.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Teacher not found" });
    }
    res.status(200).json({ message: "Teacher deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting teacher:", err);
    res.status(500).json({ error: "Failed to delete teacher" });
  }
};

// 🔢 Count Teachers
exports.countTeachers = async (req, res) => {
  try {
    const count = await Teacher.countDocuments();
    res.status(200).json({ count });
  } catch (err) {
    console.error("❌ Error counting teachers:", err);
    res.status(500).json({ error: "Failed to count teachers" });
  }
};


// 📚 Get students for a specific teacher

exports.getStudentsForTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) return res.status(404).json({ message: 'Teacher not found' });

    const students = await Student.find({
      className: teacher.className,
      section: teacher.section,
    });

    res.json(students);
  } catch (err) {
    console.error("Error fetching students for teacher:", err);
    res.status(500).json({ message: "Server error" });
  }
};
