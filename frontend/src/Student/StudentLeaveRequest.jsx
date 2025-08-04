import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link,useNavigate } from "react-router-dom";
import {
  FaBook,
  FaChartLine,
  FaCalendarCheck,
  FaMoneyBillWave,
  FaUmbrellaBeach,
  FaBullhorn,
  FaSignOutAlt,
  FaClock,
  FaTachometerAlt
} from 'react-icons/fa';


const StudentLeaveRequest = () => {
  const [formData, setFormData] = useState({
    studentName: "",
    className: "",
    section: "",
    fromDate: "",
    toDate: "",
    reason: "",
    typeOfLeave: "SL",
  });
  const [successMsg, setSuccessMsg] = useState(null);
  const [leaveRequests, setLeaveRequests] = useState([]);

  const studentId = localStorage.getItem("studentId");
   const navigate = useNavigate();

  useEffect(() => {
    if (!studentId) return;
    axios.get(`https://ss-schoolkodbloom.onrender.com/api/students/${studentId}`).then((res) => {
      const { name, className, section } = res.data;
      setFormData((prev) => ({ ...prev, studentName: name, className, section }));
    });

    fetchLeaveRequests();
  }, []);

  const fetchLeaveRequests = async () => {
    const res = await axios.get(`https://ss-schoolkodbloom.onrender.com/api/leave-requests/student/${studentId}`);
    setLeaveRequests(res.data);
  };

  const handleChange = (e) => {
    setFormData((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://ss-schoolkodbloom.onrender.com/api/leave-requests", {
        ...formData,
        studentId,
      });

      setSuccessMsg(`Leave request submitted on ${new Date(res.data.data.createdAt).toLocaleDateString()} and sent to ${res.data.teacherName}`);
      setFormData((f) => ({ ...f, fromDate: "", toDate: "", reason: "" }));
      fetchLeaveRequests();
    } catch (err) {
      setSuccessMsg(err.response?.data?.message || "Submission failed");
    }
  };

  const cancelRequest = async (id) => {
    await axios.delete(`https://ss-schoolkodbloom.onrender.com/api/leave-requests/${id}`);
    fetchLeaveRequests();
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/student-login');
  };
  
  const menuItems = [
      { key: 'dashboard', icon: <FaTachometerAlt />, label: 'Dashboard', path: '/student-dashboard' },
      { key: 'assignments', icon: <FaBook />, label: 'Assignments', path: '/student-assignments' },
      { key: 'results', icon: <FaChartLine />, label: 'Results', path: '/results' },
      { key: 'attendance', icon: <FaCalendarCheck />, label: 'Attendance', path: '/student-attendence' },
      { key: 'fees', icon: <FaMoneyBillWave />, label: 'Fee Payment', path: '/fee-status' },
      { key: 'holidays', icon: <FaUmbrellaBeach />, label: 'Holidays', path: '/holidays' },
      { key: 'subjects', icon: <FaBook />, label: 'Subjects', path: '/student-subjects' },
      { key: 'announcements', icon: <FaBullhorn />, label: 'Announcements', path: '/student-announcements' },
      { key: 'timetable', icon: <FaClock />, label: 'Time Table', path: '/time-table' },
      { key: 'leaverequest', icon: <FaClock />, label: 'Leave Request', path: '/leaverequest' },
    ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">  <Header />
     {/* Sidebar */}
     <div className="flex flex-1">
        <aside className="flex flex-col justify-between w-56 min-h-full px-3 py-6 bg-gray-800 border-r border-gray-700">
          <div>
            <h1 className="px-3 mb-6 text-lg font-bold text-white">🎓 Student Panel</h1>
            <ul className="space-y-2">
              {menuItems.map(item => (
                <li key={item.key}>
                  <Link
                    to={item.path}
                    className="flex items-center w-full px-3 py-2 text-sm text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
                  >
                    <span className="mr-3 text-gray-200">{item.icon}</span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="px-3 mt-4">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 text-sm text-white bg-yellow-500 rounded-md hover:bg-yellow-600"
            >
              <FaSignOutAlt className="text-xs" /> Logout
            </button>
          </div>
        </aside>
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10 mb-10">
      <h2 className="text-2xl font-bold mb-4 text-center text-green-700">Leave Request Form</h2>
      {successMsg && <div className="bg-green-100 text-green-800 p-3 rounded mb-4">{successMsg}</div>}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input readOnly value={formData.studentName} className="border p-2 rounded bg-gray-100" />
        <input readOnly value={formData.className} className="border p-2 rounded bg-gray-100" />
        <input readOnly value={formData.section} className="border p-2 rounded bg-gray-100" />

        <input type="date" name="fromDate" required value={formData.fromDate} onChange={handleChange} className="border p-2 rounded" />
        <input type="date" name="toDate" required value={formData.toDate} onChange={handleChange} className="border p-2 rounded" />

        <select name="typeOfLeave" value={formData.typeOfLeave} onChange={handleChange} className="border p-2 rounded">
          <option value="SL">Sick Leave (SL)</option>
          <option value="PL">Personal Leave (PL)</option>
          <option value="CL">Casual Leave (CL)</option>
        </select>

        <textarea name="reason" rows="3" required value={formData.reason} onChange={handleChange} className="md:col-span-2 border p-2 rounded" placeholder="Reason for leave" />

        <div className="md:col-span-2 text-center">
          <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">Submit</button>
        </div>
      </form>

      {/* Table of Requests */}
      <div className="mt-8">
        <h3 className="text-lg font-bold mb-2">My Leave Requests</h3>
        <table className="w-full table-auto border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2 py-1">From</th>
              <th className="border px-2 py-1">To</th>
              <th className="border px-2 py-1">Type</th>
              <th className="border px-2 py-1">Reason</th>
              <th className="border px-2 py-1">Status</th>
              <th className="border px-2 py-1">Action</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map((leave) => (
              <tr key={leave._id}>
                <td className="border px-2 py-1">{new Date(leave.fromDate).toLocaleDateString()}</td>
                <td className="border px-2 py-1">{new Date(leave.toDate).toLocaleDateString()}</td>
                <td className="border px-2 py-1">{leave.typeOfLeave}</td>
                <td className="border px-2 py-1">{leave.reason}</td>
                <td className="border px-2 py-1">{leave.status}</td>
                <td className="border px-2 py-1">
                  {leave.status === "Pending" && (
                    <button onClick={() => cancelRequest(leave._id)} className="text-red-600 hover:underline">
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {leaveRequests.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-2">No leave requests yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
     </div>
    </div>
     <Footer />
     
    </div>
  );
};

export default StudentLeaveRequest;
