import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserGraduate, FaBook, FaChalkboardTeacher, FaClock } from "react-icons/fa";
import { MdAssignment, MdGrade } from "react-icons/md";

const StudentOverview = () => {
  const student = JSON.parse(localStorage.getItem("student")) || {};
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [lastLogin, setLastLogin] = useState("");
  const navigate = useNavigate();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    else if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    const loginTime = new Date();
    loginTime.setHours(loginTime.getHours() - 2);
    setLastLogin(loginTime.toLocaleString());

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-blue-50 to-indigo-50 md:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Dashboard Header */}
        <div className="flex flex-col mb-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Student Dashboard
            </h1>
            <p className="text-sm text-blue-700/80">Welcome back, {student.name || "Student"}!</p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium text-blue-800/90">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </span>
              <span className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-700 rounded-full bg-blue-50">
                <FaClock className="w-4 h-4 mr-1" />
                {currentTime}
              </span>
            </div>
          </div>
        </div>

        {/* Greeting Card */}
        <div className="p-6 mb-8 shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl">
          <div className="flex items-center">
            <div className="p-3 mr-6 bg-white/20 rounded-xl backdrop-blur-sm">
              <FaUserGraduate className="w-10 h-10 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{getGreeting()}</h2>
              <p className="text-blue-100">Last login: {lastLogin || "Just now"}</p>
              <p className="mt-1 text-blue-100">
                Class: <span className="font-medium">{student.className || "N/A"}</span> | 
                Section: <span className="font-medium">{student.section || "N/A"}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions as Navigation Links */}
        <div className="p-6 mb-8 bg-white shadow-lg rounded-2xl">
          <h3 className="mb-6 text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            Quick Links
          </h3>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            <button
              onClick={() => navigate("/time-table")}
              className="flex flex-col items-center justify-center p-5 transition-all duration-300 transform group bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl hover:from-blue-100 hover:to-blue-200 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="p-3 mb-3 bg-white rounded-lg shadow-sm group-hover:bg-blue-50">
                <FaBook className="w-8 h-8 text-blue-600" />
              </div>
              <span className="text-sm font-semibold text-blue-800">View Classes</span>
              <span className="mt-1 text-xs text-blue-600/80">Your schedule</span>
            </button>

            <button
              onClick={() => navigate("/student-assignments")}
              className="flex flex-col items-center justify-center p-5 transition-all duration-300 transform group bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl hover:from-indigo-100 hover:to-indigo-200 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="p-3 mb-3 bg-white rounded-lg shadow-sm group-hover:bg-indigo-50">
                <MdAssignment className="w-8 h-8 text-indigo-600" />
              </div>
              <span className="text-sm font-semibold text-indigo-800">Submit Work</span>
              <span className="mt-1 text-xs text-indigo-600/80">Assignments</span>
            </button>

            <button
              onClick={() => navigate("/results")}
              className="flex flex-col items-center justify-center p-5 transition-all duration-300 transform group bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl hover:from-teal-100 hover:to-teal-200 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="p-3 mb-3 bg-white rounded-lg shadow-sm group-hover:bg-teal-50">
                <MdGrade className="w-8 h-8 text-teal-600" />
              </div>
              <span className="text-sm font-semibold text-teal-800">Check Grades</span>
              <span className="mt-1 text-xs text-teal-600/80">Your performance</span>
            </button>

            <button
              onClick={() => navigate("/student/contact-teacher")}
              className="flex flex-col items-center justify-center p-5 transition-all duration-300 transform group bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl hover:from-purple-100 hover:to-purple-200 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="p-3 mb-3 bg-white rounded-lg shadow-sm group-hover:bg-purple-50">
                <FaChalkboardTeacher className="w-8 h-8 text-purple-600" />
              </div>
              <span className="text-sm font-semibold text-purple-800">Contact Teacher</span>
              <span className="mt-1 text-xs text-purple-600/80">Get help</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-blue-800/70">
            © {new Date().getFullYear()} School Management System | <span className="font-medium">v1.0.0</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentOverview;
