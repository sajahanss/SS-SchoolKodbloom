const express = require("express");
const router = express.Router();
const LeaveRequest = require("../models/LeaveRequest");
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const Attendance = require("../models/Attendance");

// ✅ Submit new leave request
router.post("/", async (req, res) => {
  try {
    const { studentId, fromDate, toDate, reason, typeOfLeave } = req.body;

    const existingRequest = await LeaveRequest.findOne({
      studentId,
      fromDate: { $lte: new Date(toDate) },
      toDate: { $gte: new Date(fromDate) },
      status: { $in: ["Pending", "Approved"] }
    });

    if (existingRequest) {
      return res.status(400).json({ message: "Leave already requested for this period." });
    }

    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ message: "Student not found" });

    const teacher = await Teacher.findOne({
      className: student.className,
      section: student.section,
    });

    const newLeave = new LeaveRequest({
      studentId,
      className: student.className,
      section: student.section,
      fromDate,
      toDate,
      reason,
      typeOfLeave,
      teacherId: teacher?._id || null,
    });

    await newLeave.save();

    res.status(201).json({
      message: "Leave request submitted",
      data: newLeave,
      teacherName: teacher?.name || "Not Assigned",
    });
  } catch (error) {
    console.error("Error submitting leave request:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get all leave requests for a student
router.get("/student/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;
    const requests = await LeaveRequest.find({ studentId }).sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    console.error("Error fetching leave requests:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Cancel a pending leave request
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const leave = await LeaveRequest.findById(id);
    if (!leave) return res.status(404).json({ message: "Leave request not found" });

    if (leave.status !== "Pending") {
      return res.status(400).json({ message: "Only pending requests can be cancelled" });
    }

    leave.status = "Cancelled";
    await leave.save();

    res.json({ message: "Leave request cancelled", data: leave });
  } catch (error) {
    console.error("Error cancelling leave request:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Approve a leave request
router.put("/:id/approve", async (req, res) => {
  try {
    const leaveId = req.params.id;
    const leave = await LeaveRequest.findById(leaveId).populate("studentId teacherId");
    if (!leave) return res.status(404).json({ message: "Leave request not found" });

    leave.status = "Approved";
    await leave.save();

    const start = new Date(leave.fromDate);
    const end = new Date(leave.toDate);

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const date = d.toISOString().split("T")[0];

      let attendance = await Attendance.findOne({
        className: leave.className,
        section: leave.section,
        date,
      });

      if (!attendance) {
        attendance = new Attendance({
          className: leave.className,
          section: leave.section,
          date,
          records: [],
        });
      }

      const alreadyMarked = attendance.records.find(
        (r) => r.studentId.toString() === leave.studentId._id.toString()
      );

      if (!alreadyMarked) {
        attendance.records.push({
          studentId: leave.studentId._id,
          studentName: leave.studentId.name,
          status: "Leave",
          disabled: true,
        });
      }

      await attendance.save();
    }

    res.json({ message: "Leave approved and attendance marked as leave", leave });
  } catch (err) {
    console.error("Error approving leave:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get pending leave requests for a teacher
router.get("/teacher/:teacherId", async (req, res) => {
  try {
    const { teacherId } = req.params;
    const requests = await LeaveRequest.find({ teacherId, status: "Pending" })
      .populate("studentId", "name rollno")
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (error) {
    console.error("Error fetching teacher leave requests:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Update leave request status (approve/reject)
router.put("/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const leave = await LeaveRequest.findById(id).populate("studentId teacherId");
    if (!leave) return res.status(404).json({ message: "Leave request not found" });

    leave.status = status;
    await leave.save();

    if (status === "Approved") {
      const start = new Date(leave.fromDate);
      const end = new Date(leave.toDate);

      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        const date = d.toISOString().split("T")[0];

        let attendance = await Attendance.findOne({
          className: leave.className,
          section: leave.section,
          date,
        });

        if (!attendance) {
          attendance = new Attendance({
            className: leave.className,
            section: leave.section,
            date,
            records: [],
          });
        }

        const alreadyMarked = attendance.records.find(
          (r) => r.studentId.toString() === leave.studentId._id.toString()
        );

        if (!alreadyMarked) {
          attendance.records.push({
            studentId: leave.studentId._id,
            studentName: leave.studentId.name,
            status: "Leave",
            disabled: true,
          });
        }

        await attendance.save();
      }
    }

    res.json({ message: `Leave ${status.toLowerCase()}`, data: leave });
  } catch (err) {
    console.error("Error updating leave status:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
