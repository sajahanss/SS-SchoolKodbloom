// 📁 controllers/leaveRequestController.js

const LeaveRequest = require('../models/LeaveRequest');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');

exports.submitLeaveRequest = async (req, res) => {
  try {
    const { studentId, fromDate, toDate, reason } = req.body;

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Find class teacher
    const teacher = await Teacher.findOne({
      className: student.className,
      section: student.section,
    });

    const leave = new LeaveRequest({
      studentId,
      className: student.className,
      section: student.section,
      fromDate,
      toDate,
      reason,
      teacherId: teacher ? teacher._id : null,
    });

    await leave.save();
    res.status(201).json({ message: "Leave request submitted", leave });
  } catch (err) {
    console.error("❌ Leave request error:", err);
    res.status(500).json({ message: "Failed to submit leave request" });
  }
};
