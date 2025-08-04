import React, { useEffect, useState } from "react";
import { FaChalkboardTeacher, FaBook, FaClock } from "react-icons/fa";
import { MdAssignment } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const TeacherOverview = () => {
  const teacher = JSON.parse(localStorage.getItem("teacher")) || {};
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [lastLogin, setLastLogin] = useState("");

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
        {/* Header */}
        <div className="flex flex-col mb-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-900 to-blue-900">
              Teacher Dashboard
            </h1>
            <p className="text-sm text-indigo-900/80">Welcome back, {teacher.name || "Teacher"}!</p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium text-indigo-900/90">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </span>
              <span className="inline-flex items-center px-4 py-2 text-sm font-medium text-indigo-900 rounded-full bg-indigo-50">
                <FaClock className="w-4 h-4 mr-1" />
                {currentTime}
              </span>
            </div>
          </div>
        </div>

        {/* Greeting Card */}
        <div className="p-6 mb-8 shadow-lg bg-gradient-to-r from-indigo-900 to-blue-900 rounded-2xl">
          <div className="flex items-center">
            <div className="p-3 mr-6 bg-white/20 rounded-xl backdrop-blur-sm">
              <FaChalkboardTeacher className="w-10 h-10 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{getGreeting()}</h2>
              <p className="text-indigo-100">Last login: {lastLogin || "Just now"}</p>
              <p className="mt-1 text-indigo-100">
                Teaching: <span className="font-medium">{teacher.subject || "N/A"}</span> | 
                Department: <span className="font-medium">{teacher.department || "N/A"}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions - Linked Buttons */}
        <div className="p-6 mb-8 bg-white shadow-lg rounded-2xl">
          <h3 className="mb-6 text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-900 to-blue-900">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            <button
              onClick={() => navigate("/teacher-subjects")}
              className="flex flex-col items-center justify-center p-5 transition-all duration-300 transform group bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl hover:from-indigo-100 hover:to-indigo-200 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="p-3 mb-3 transition-colors bg-white rounded-lg shadow-sm group-hover:bg-indigo-50">
                <FaBook className="w-8 h-8 text-indigo-900" />
              </div>
              <span className="text-sm font-semibold text-indigo-800">Subjects</span>
              <span className="mt-1 text-xs text-indigo-900/80">New subjects </span>
            </button>

            <button
              onClick={() => navigate("/teacher-assignments")}
              className="flex flex-col items-center justify-center p-5 transition-all duration-300 transform group bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl hover:from-blue-100 hover:to-blue-200 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="p-3 mb-3 transition-colors bg-white rounded-lg shadow-sm group-hover:bg-blue-50">
                <MdAssignment className="w-8 h-8 text-blue-900" />
              </div>
              <span className="text-sm font-semibold text-blue-900">New Assignment</span>
              <span className="mt-1 text-xs text-blue-900/80">For your students</span>
            </button>

            <button
              onClick={() => navigate("/add-results")}
              className="flex flex-col items-center justify-center p-5 transition-all duration-300 transform group bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl hover:from-teal-100 hover:to-teal-200 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="p-3 mb-3 transition-colors bg-white rounded-lg shadow-sm group-hover:bg-teal-50">
                <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
              </div>
              <span className="text-sm font-semibold text-teal-800">Grade Work</span>
              <span className="mt-1 text-xs text-teal-600/80">Student submissions</span>
            </button>

            <button
              onClick={() => navigate("/teacher/settings")}
              className="flex flex-col items-center justify-center p-5 transition-all duration-300 transform group bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl hover:from-purple-100 hover:to-purple-200 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="p-3 mb-3 transition-colors bg-white rounded-lg shadow-sm group-hover:bg-purple-50">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
              <span className="text-sm font-semibold text-purple-800">Settings</span>
              <span className="mt-1 text-xs text-purple-600/80">Profile & preferences</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-indigo-800/70">
            © {new Date().getFullYear()} School Management System | <span className="font-medium">v1.0.0</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TeacherOverview;
