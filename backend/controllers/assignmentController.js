const Assignment = require('../models/Assignment');

// ✅ Add a new assignment
exports.addAssignment = async (req, res) => {
  try {
    const {
      title = '',
      description = '',
      dueDate,
      className = '',
      section = '',
      teacher
    } = req.body;

    // ✅ Validation check
    if (
      !title.trim() ||
      !description.trim() ||
      !dueDate ||
      !className.trim() ||
      !section.trim() ||
      !teacher
    ) {
      return res.status(400).json({ message: "❌ All fields are required" });
    }

    // ✅ Optional: Check for duplicate assignment
    const existing = await Assignment.findOne({
      title: title.trim(),
      dueDate,
      className: className.trim(),
      section: section.trim()
    });

    if (existing) {
      return res.status(409).json({ message: "⚠️ Assignment with same title and due date already exists for this class/section" });
    }

    const newAssignment = new Assignment({
      title: title.trim(),
      description: description.trim(),
      dueDate,
      className: className.trim(),
      section: section.trim(),
      teacher,
    });

    await newAssignment.save();
    res.status(201).json({ message: "✅ Assignment added successfully" });
  } catch (error) {
    console.error("❌ Error adding assignment:", error.message);
    res.status(500).json({ message: "Server error while adding assignment" });
  }
};

// ✅ Get assignments by class and section
exports.getAssignmentsByClassSection = async (req, res) => {
  const { className, section } = req.params;

  try {
    const assignments = await Assignment.find({ className, section })
      .populate('teacher', 'name') // populates the 'teacher' field with name only
      .sort({ dueDate: 1 }); // sort by nearest due date

    res.json(assignments);
  } catch (error) {
    console.error("❌ Error fetching assignments:", error.message);
    res.status(500).json({ message: "Server error while fetching assignments" });
  }
};
