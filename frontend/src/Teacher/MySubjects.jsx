import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaChalkboardTeacher, FaClock } from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
import Header from "../components/Header";
import Footer from "../components/Footer";

const MySubjects = () => {
  const name = localStorage.getItem("teacherName");
  const [subjects, setSubjects] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSubjects = async () => {
      const teacherId = localStorage.getItem("teacherId");

      if (!teacherId) {
        setError("❌ Teacher ID not found. Please log in again.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`http://localhost:5000/api/subjects/teacher/${teacherId}`);
        if (res.data.success) {
          setSubjects(res.data.data);
        } else {
          setError(res.data.message || "⚠️ Failed to load subjects");
        }
      } catch (err) {
        console.error("Error fetching subjects:", err);
        setError("⚠️ Failed to fetch subjects. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    else if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 p-4">
        <div className="max-w-6xl mx-auto overflow-hidden bg-white shadow-md rounded-xl">
          {/* Page Header */}
          <div className="flex flex-col justify-between gap-4 p-4 text-white bg-blue-900 rounded-t-lg md:flex-row md:items-center">
            <div className="flex items-center gap-3">
              <div className="p-3 text-white bg-blue-800 rounded-full">
                <GiTeacher className="text-2xl" />
              </div>
              <div>
                <h1 className="text-xl font-bold">📚 Teaching Subjects</h1>
                <p className="text-sm opacity-90">
                  Hello {name || "Teacher"} 👋 — {getGreeting()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium">
              <FaClock className="text-white" />
              <span>{currentTime}</span>
            </div>
          </div>

          {/* Subject Cards */}
          <div className="p-6 space-y-6 text-gray-800 border border-indigo-100 bg-indigo-50 rounded-b-xl">
            {loading ? (
              <div className="flex flex-col items-center justify-center p-8 space-y-3">
                <div className="w-8 h-8 border-4 border-blue-900 rounded-full border-t-transparent animate-spin"></div>
                <p className="text-gray-600">Loading your subjects...</p>
              </div>
            ) : error ? (
              <div className="p-4 text-center text-red-700 border border-red-200 rounded-lg shadow-sm bg-red-50">
                <p>{error}</p>
              </div>
            ) : subjects.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-8 space-y-3 text-center">
                <FaChalkboardTeacher className="text-4xl text-gray-400" />
                <p className="text-gray-600">No subjects have been assigned to you yet.</p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {subjects.map((subj) => (
                  <div
                    key={subj._id}
                    className="p-5 transition-all duration-200 bg-white border border-indigo-200 rounded-lg shadow hover:shadow-md hover:border-indigo-400 hover:-translate-y-1"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 text-indigo-900 bg-indigo-100 rounded-md">
                        <FaChalkboardTeacher className="text-lg" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800">{subj.subjectName}</h3>
                    </div>
                    <div className="space-y-1 text-sm text-gray-700">
                      <p>
                        <span className="font-medium text-blue-700">Class:</span> {subj.className}
                      </p>
                      <p>
                        <span className="font-medium text-blue-700">Section:</span> {subj.section}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
};

export default MySubjects;
