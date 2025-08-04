const Subject = require("../models/Subject");

// ✅ Get all subjects
exports.getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find().populate("teacher", "name");
    res.status(200).json({ success: true, data: subjects });
  } catch (error) {
    console.error("❌ Error fetching subjects:", error.message);
    res.status(500).json({ success: false, message: "Failed to get subjects" });
  }
};

// ✅ Add a new subject
exports.addSubject = async (req, res) => {
  try {
    const { subjectName, className, section, teacher } = req.body;

    if (!subjectName || !className || !section || !teacher) {
      return res.status(400).json({
        success: false,
        message: "All fields (subjectName, className, section, teacher) are required",
      });
    }

    const subjectImage = req.file ? req.file.filename : null;

    const newSubject = new Subject({
      subjectName,
      className,
      section,
      teacher,
      subjectImage,
    });

    await newSubject.save();

    // Populate teacher name after save
    const populatedSubject = await Subject.findById(newSubject._id).populate("teacher", "name");

    res.status(201).json({
      success: true,
      message: "Subject added successfully",
      data: populatedSubject,
    });
  } catch (error) {
    console.error("❌ Error adding subject:", error.message);
    res.status(500).json({ success: false, message: "Failed to add subject" });
  }
};

// ✅ Get subjects by teacher ID
exports.getSubjectsByTeacher = async (req, res) => {
  try {
    const { teacherId } = req.params;

    if (!teacherId) {
      return res.status(400).json({ success: false, message: "Teacher ID is required" });
    }

    const subjects = await Subject.find({ teacher: teacherId }).populate("teacher", "name");
    res.status(200).json({ success: true, data: subjects });
  } catch (error) {
    console.error("❌ Error fetching teacher's subjects:", error.message);
    res.status(500).json({ success: false, message: "Error fetching teacher subjects" });
  }
};

// ✅ Get subjects by class and section
exports.getSubjectsByClassSection = async (req, res) => {
  try {
    const { className, section } = req.params;

    if (!className || !section) {
      return res.status(400).json({
        success: false,
        message: "Both className and section are required in URL params",
      });
    }

    const subjects = await Subject.find({ className, section }).populate("teacher", "name");
    res.status(200).json({ success: true, data: subjects });
  } catch (error) {
    console.error("❌ Error fetching class/section subjects:", error.message);
    res.status(500).json({
      success: false,
      message: "Error fetching subjects for class and section",
    });
  }
};

// ✅ Delete subject by ID
exports.deleteSubject = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Subject.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Subject not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Subject deleted successfully",
    });
  } catch (error) {
    console.error("❌ Error deleting subject:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to delete subject",
    });
  }
};
