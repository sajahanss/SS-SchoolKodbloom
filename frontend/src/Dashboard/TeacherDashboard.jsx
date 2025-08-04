import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import TeacherOverview from "../Teacher/TeacherOverview";

import {
  FaTasks,
  FaBook,
  FaUsers,
  FaCalendarCheck,
  FaClock,
  FaBullhorn,
  FaSignOutAlt,
  FaTachometerAlt,
  FaRegFileAlt,
} from "react-icons/fa";

const TeacherDashboard = () => {
  const navigate = useNavigate();

  const name = localStorage.getItem("teacherName");
  const profileImage = localStorage.getItem("teacherProfileImage");
  const teacherSubject = localStorage.getItem("teacherSubject");
  const teacherClass = localStorage.getItem("teacherClass");

  useEffect(() => {
    if (!name) {
      navigate("/teacher-login");
    }
  }, [name, navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/teacher-login");
  };

  const menuItems = [
    { key: "dashboard", icon: <FaTachometerAlt />, label: "Dashboard", path: "/teacher-dashboard" },
    { key: "assignments", icon: <FaTasks />, label: "Add Assignments", path: "/teacher-assignments" },
    { key: "subjects", icon: <FaBook />, label: "My Subjects", path: "/teacher-subjects" },
    { key: "attendance", icon: <FaUsers />, label: "Manage Attendance", path: "/teacher-attendance" },
    { key: "results", icon: <FaRegFileAlt />, label: "Add Results", path: "/add-results" },
    { key: "holidays", icon: <FaCalendarCheck />, label: "Holidays", path: "/teacher-holidays" },
    { key: "timetable", icon: <FaClock />, label: "Time Table", path: "/teacher-timetable" },
    { key: "announcements", icon: <FaBullhorn />, label: "Announcements", path: "/teacher-announcements" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="flex flex-col justify-between w-56 min-h-full px-3 py-6 bg-gray-800 border-r border-gray-700">
          <div>
            <h1 className="px-3 mb-6 text-lg font-bold text-white">👨‍🏫 Teacher Panel</h1>
            <ul className="space-y-2">
              {menuItems.map((item) => (
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

        {/* Main Content */}
        <div className="flex flex-col flex-1 min-h-full">
          <header className="px-4 py-2 bg-white shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">Teacher Dashboard</h2>
              <div className="flex items-center gap-3">
                <div className="leading-tight text-right">
                  <span className="block text-sm font-medium text-gray-700 truncate max-w-[120px]">
                    {name || "Teacher"}
                  </span>
                  <span className="text-xs text-gray-500">
                    {teacherSubject ? `Subject: ${teacherSubject}` : "Faculty"} •{" "}
                    {teacherClass ? `Class: ${teacherClass}` : ""}
                  </span>
                </div>
                <img
                  src={
                    profileImage
                      ? `https://ss-schoolkodbloom.onrender.com/uploads/${profileImage}`
                      : `https://ui-avatars.com/api/?name=${encodeURIComponent(name || "Teacher")}&background=random`
                  }
                  alt="Profile"
                  className="object-cover border border-gray-300 rounded-full w-9 h-9"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name || "Teacher")}&background=random`;
                  }}
                />
              </div>
            </div>
          </header>

          <main className="flex-1 px-4 pt-2 pb-4 overflow-y-auto bg-gray-100">
            <TeacherOverview />
          </main>
        </div>
      </div>

      <footer className="w-full bg-white border-t border-gray-200">
        <Footer />
      </footer>
    </div>
  );
};

export default TeacherDashboard;
