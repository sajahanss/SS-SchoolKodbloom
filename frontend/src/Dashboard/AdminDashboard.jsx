import React from "react";
import {
  FaBullhorn,
  FaBookOpen,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaCalendarAlt,
  FaSignOutAlt,
  FaHome,
  FaRupeeSign,
  FaChartBar, // 📊 Icon for Analytics
} from "react-icons/fa";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const admin = JSON.parse(localStorage.getItem("admin")) || {};

  const menuItems = [
    { key: "overview", label: "Dashboard", icon: <FaHome />, path: "/admin-dashboard" },
    { key: "announcements", label: "Announcements", icon: <FaBullhorn />, path: "/announcements" },
    { key: "courses", label: "Manage Subjects", icon: <FaBookOpen />, path: "/manage-subjects" },
    { key: "students", label: "Manage Students", icon: <FaUserGraduate />, path: "/manage-students" },
    { key: "teachers", label: "Manage Teachers", icon: <FaChalkboardTeacher />, path: "/manage-teachers" },
    { key: "holidays", label: "Add Holidays", icon: <FaCalendarAlt />, path: "/add-holidays" },
    { key: "timetable", label: "Time Table", icon: <FaCalendarAlt />, path: "/timetable" },
    { key: "fees", label: "Fee Payment", icon: <FaRupeeSign />, path: "/fee-payment" },

    // 🆕 Newly Added
    { key: "calendar", label: "Academic Calendar", icon: <FaCalendarAlt />, path: "/academic-calendar" },
    { key: "analytics", label: "Reports & Analytics", icon: <FaChartBar />, path: "/analytics" },
  ];

  const activePath = location.pathname;

  const handleLogout = () => {
    localStorage.removeItem("admin");
    window.location.href = "/admin-login";
  };

  const getProfilePicture = () => {
    if (!admin?.photo) {
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(admin?.name || "Admin")}&background=random`;
    }
    if (admin.photo.startsWith("http")) {
      return admin.photo;
    }
    return `https://ss-schoolkodbloom.onrender.com/${admin.photo.replace(/^\/+/, "")}`;
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-gray-50">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="flex flex-col justify-between w-56 min-h-full px-3 py-6 bg-gray-800 border-r border-gray-700">
          <div>
            <h1 className="px-3 mb-6 text-lg font-bold text-white">🛠️ Admin Panel</h1>
            <ul className="space-y-4">
              <h2 className="px-3 mb-2 text-xs font-semibold text-blue-300 uppercase">Admin Tools</h2>
              {menuItems.map((item) => (
                <li key={item.key}>
                  <button
                    onClick={() => navigate(item.path)}
                    className={`flex items-center w-full px-3 py-2.5 text-sm rounded-md transition-colors ${
                      activePath === item.path
                        ? "bg-gray-700 text-white font-medium"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Logout */}
          <div className="px-3 mt-4">
            <button
              onClick={handleLogout}
              className="flex items-center w-20 gap-2 px-3 py-2 text-sm text-white transition-colors bg-yellow-500 rounded-md hover:bg-yellow-600"
            >
              <FaSignOutAlt className="text-xs" />
              Logout
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex flex-col flex-1 min-h-full overflow-hidden">
          <header className="px-4 py-2 bg-white shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">
                {menuItems.find((item) => item.path === activePath)?.label || "Dashboard"}
              </h2>

              <div className="flex items-center gap-3">
                <div className="leading-tight text-right">
                  <span className="block text-sm font-medium text-gray-700 truncate max-w-[120px]">
                    👑 {admin?.name || "Admin"}
                  </span>
                  <span className="text-xs text-gray-500">Administrator</span>
                </div>
                <img
                  src={getProfilePicture()}
                  alt="Admin"
                  className="object-cover border border-gray-300 rounded-full w-9 h-9"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      admin?.name || "Admin"
                    )}&background=random`;
                  }}
                />
              </div>
            </div>
          </header>

          {/* Nested Routes */}
          <main className="flex-1 px-4 pt-2 pb-4 overflow-y-auto bg-gray-50">
            <div className="p-4 bg-white rounded-lg shadow">
              <Outlet />
            </div>
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

export default AdminDashboard;
