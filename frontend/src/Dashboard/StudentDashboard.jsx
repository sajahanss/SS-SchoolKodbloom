import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Footer from "../components/Footer";
import Header from "../components/Header";
import StudentOverview from "../Student/StudentOverview"; // ✅ Import StudentOverview

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

const StudentDashboard = () => {
  const navigate = useNavigate();

  const name = localStorage.getItem('studentName');
  const profileImage = localStorage.getItem('studentProfileImage');
  const className = localStorage.getItem('studentClass');
  const section = localStorage.getItem('studentSection');

  useEffect(() => {
    if (!name) {
      navigate('/student-login');
    }
  }, [name, navigate]);

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
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Global Header */}
      <Header />

      <div className="flex flex-1">
        {/* Sidebar */}
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

        {/* Main Content */}
        <div className="flex flex-col flex-1 min-h-full">
          {/* Local Header inside dashboard */}
          <header className="px-4 py-2 bg-white shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">Student Dashboard</h2>
              <div className="flex items-center gap-3">
                <div className="leading-tight text-right">
                  <span className="block text-sm font-medium text-gray-700 truncate max-w-[120px]">{name || 'Student'}</span>
                  <span className="text-xs text-gray-500">Class {className} • Sec {section}</span>
                </div>
                <img
                  src={profileImage ? `http://localhost:5000/uploads/${profileImage}` : `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'Student')}&background=random`}
                  alt="Profile"
                  className="object-cover border border-gray-300 rounded-full w-9 h-9"
                  onError={e => {
                    e.target.onerror = null;
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'Student')}&background=random`;
                  }}
                />
              </div>
            </div>
          </header>

          {/* Main Section with StudentOverview */}
          <main className="flex-1 px-4 pt-2 pb-4 overflow-y-auto bg-gray-100">
            <StudentOverview />
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-white border-t border-gray-200">
        <Footer />
      </footer>
    </div>
  );
};

export default StudentDashboard;
