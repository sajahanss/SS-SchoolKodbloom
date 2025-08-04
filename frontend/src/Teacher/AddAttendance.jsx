import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import TeacherLeaveRequestModal from "./TeacherLeaveRequestModal";
import { Badge, Button } from "@mui/material";
import Header from "../components/Header";

const AddAttendance = () => {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [leaveStatus, setLeaveStatus] = useState({});
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [pendingCount, setPendingCount] = useState(0);
  const [disabledAttendance, setDisabledAttendance] = useState(false);
  const [leaveModalOpen, setLeaveModalOpen] = useState(false);
  const [teacherName, setTeacherName] = useState("");

  const teacherId = localStorage.getItem("teacherId");

  // Fetch students under this teacher
  const fetchStudents = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/teachers/${teacherId}/students`);
      setStudents(res.data);
    } catch (err) {
      toast.error("Failed to load students.");
    }
  };

  // Fetch teacher's name
  const fetchTeacher = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/teachers/${teacherId}`);
      setTeacherName(res.data.name || "");
    } catch (err) {
      console.error("Failed to fetch teacher name.");
    }
  };

  // Fetch pending leave requests
  const fetchPendingCount = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/leave-requests/teacher/${teacherId}`);
      const pending = res.data.filter((req) => req.status === "Pending");
      setPendingCount(pending.length);
      setDisabledAttendance(pending.length > 0);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch attendance (including leave students)
  const fetchAttendanceLeaveStatus = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/attendance");
      const record = res.data.find(
        (r) =>
          r.date === date &&
          r.className === students[0]?.className &&
          r.section === students[0]?.section &&
          r.teacherId?.toString() === teacherId
      );

      if (record) {
        const leaveMap = {};
        const attendanceMap = {};

        record.records.forEach((r) => {
          if (r.status === "Leave") {
            leaveMap[r.studentId] = true;
            attendanceMap[r.studentId] = "Leave";
          } else {
            attendanceMap[r.studentId] = r.status;
          }
        });

        setLeaveStatus(leaveMap);
        setAttendance(attendanceMap);
      } else {
        setLeaveStatus({});
        setAttendance({});
      }
    } catch (err) {
      console.error("Failed to fetch attendance data");
    }
  };

  useEffect(() => {
    fetchStudents();
    fetchTeacher();
    fetchPendingCount();
  }, []);

  useEffect(() => {
    if (students.length) fetchAttendanceLeaveStatus();
  }, [students, date]);

  const handleAttendanceChange = (studentId, value) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: value,
    }));
  };

  const handleSubmit = async () => {
    if (disabledAttendance) {
      toast.warning("Approve all leave requests before submitting attendance.");
      return;
    }

    try {
      const records = students.map((student) => {
        const status =
          leaveStatus[student._id] === true
            ? "Leave"
            : attendance[student._id] || "Absent";

        return {
          studentId: student._id,
          studentName: student.name,
          status,
        };
      });

      const payload = {
        date,
        className: students[0]?.className || "",
        section: students[0]?.section || "",
        subject: "",
        period: 0,
        timeSlot: "",
        teacherId,
        teacherName,
        records,
      };

      await axios.post("http://localhost:5000/api/attendance/add", payload);
      toast.success("✅ Attendance submitted successfully!");
      fetchAttendanceLeaveStatus();
    } catch (err) {
      console.error(err);
      toast.error("❌ Error submitting attendance.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-md mt-10 rounded-md">
      <Header />

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Mark Attendance</h2>
        <Badge badgeContent={pendingCount} color="error">
          <Button
            onClick={() => setLeaveModalOpen(true)}
            variant="contained"
            color="secondary"
          >
            Review Leave Requests
          </Button>
        </Badge>
      </div>

      {/* Date Picker */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Select Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border border-gray-300 p-2 rounded-md"
        />
      </div>

      {/* Student Table */}
      <table className="w-full border mt-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Roll No</th>
            <th className="p-2 border">Attendance</th>
          </tr>
        </thead>
        <tbody>
          {students.map((stu) => (
            <tr
              key={stu._id}
              className={attendance[stu._id] ? "bg-gray-100" : ""}
            >
              <td className="p-2 border">{stu.name}</td>
              <td className="p-2 border">{stu.rollno}</td>
              <td className="p-2 border">
                <select
                  value={attendance[stu._id] || ""}
                  onChange={(e) => handleAttendanceChange(stu._id, e.target.value)}
                  className="border rounded-md p-1"
                  disabled={attendance[stu._id]}
                >
                  <option value="">--Select--</option>
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                  <option value="Leave" disabled>Leave</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Submit Button */}
      <div className="mt-6 text-center">
        <button
          onClick={handleSubmit}
          disabled={disabledAttendance}
          className={`px-6 py-2 rounded-md font-semibold text-white ${
            disabledAttendance
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          Submit Attendance
        </button>
        {disabledAttendance && (
          <p className="text-sm text-red-500 mt-2">
            You must approve all leave requests before marking attendance.
          </p>
        )}
      </div>

      {/* Leave Modal */}
      <TeacherLeaveRequestModal
        open={leaveModalOpen}
        onClose={() => setLeaveModalOpen(false)}
        teacherId={teacherId}
        onApprovalChange={() => {
          fetchPendingCount();
          fetchAttendanceLeaveStatus();
        }}
      />
    </div>
  );
};

export default AddAttendance;
