const Attendance = require('../models/Attendance');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const mongoose = require('mongoose');

// ✅ Add Attendance (Teacher)
exports.addAttendance = async (req, res) => {
  try {
    const {
      date,
      className,
      section,
      subject,
      period,
      timeSlot,
      teacherId,
      records,
    } = req.body;

    if (!records || !Array.isArray(records) || records.length === 0) {
      return res.status(400).json({ message: "❌ No attendance records provided" });
    }

    const teacher = await Teacher.findById(teacherId);
    if (!teacher) return res.status(404).json({ message: "❌ Teacher not found" });

    // Remove old entry if exists for the same class/section/date/subject/period
    await Attendance.deleteOne({ date, className, section, subject, period });

    const newAttendance = new Attendance({
      date,
      className,
      section,
      subject,
      period,
      timeSlot,
      teacherName: teacher.name,
      teacherId,
      records: [],
    });

    for (const rec of records) {
      const student = await Student.findById(rec.studentId);
      if (student) {
        newAttendance.records.push({
          studentId: student._id,
          studentName: student.name,
          status: rec.status,
          disabled: false,
        });
      }
    }

    await newAttendance.save();
    res.status(201).json({ message: "✅ Attendance submitted successfully!", attendance: newAttendance });
  } catch (error) {
    console.error("❌ Attendance Submit Error:", error);
    res.status(500).json({ message: "❌ Failed to submit attendance" });
  }
};

// ✅ Get Attendance by Student ID
exports.getAttendanceByStudentId = async (req, res) => {
  try {
    const { studentId } = req.params;

    if (!studentId || !mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({ message: "❌ Invalid or missing student ID" });
    }

    const attendanceData = await Attendance.find({
      "records.studentId": new mongoose.Types.ObjectId(studentId)
    });

    if (!attendanceData || attendanceData.length === 0) {
      return res.status(404).json({ message: "⚠️ No attendance found for this student" });
    }

    const studentAttendance = attendanceData.map((entry) => {
      const studentRecord = entry.records.find((r) =>
        r.studentId.toString() === studentId
      );

      return {
        date: entry.date,
        subject: entry.subject,
        teacherName: entry.teacherName,
        period: entry.period,
        timeSlot: entry.timeSlot,
        status: studentRecord?.status || "N/A",
      };
    });

    res.status(200).json(studentAttendance);
  } catch (error) {
    console.error("❌ Get Student Attendance Error:", error);
    res.status(500).json({ message: "❌ Failed to fetch student attendance" });
  }
};

// ✅ Get all attendance (for internal use like checking leave status)
exports.getAllAttendance = async (req, res) => {
  try {
    const all = await Attendance.find();
    res.json(all);
  } catch (err) {
    console.error("Error fetching all attendance:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Mark attendance as Leave for approved leave dates
exports.markLeaveForDates = async (req, res) => {
  const { studentId, fromDate, toDate } = req.body;

  try {
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const start = new Date(fromDate);
    const end = new Date(toDate);

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const date = new Date(d).toISOString().split("T")[0]; // Format: yyyy-mm-dd

      let record = await Attendance.findOne({
        date,
        className: student.className,
        section: student.section,
      });

      if (!record) {
        record = new Attendance({
          date,
          className: student.className,
          section: student.section,
          subject: "Leave",
          teacherName: "System",
          teacherId: null,
          period: 0,
          timeSlot: "",
          records: [],
        });
      }

      const alreadyExists = record.records.find(
        (r) => r.studentId.toString() === studentId
      );

      if (!alreadyExists) {
        record.records.push({
          studentId: student._id,
          studentName: student.name,
          status: "Leave",
          disabled: true,
        });
      }

      await record.save();
    }

    res.status(200).json({ message: "✅ Leave marked in attendance" });
  } catch (error) {
    console.error("❌ Error marking leave in attendance:", error);
    res.status(500).json({ message: "❌ Failed to mark leave in attendance" });
  }
};
