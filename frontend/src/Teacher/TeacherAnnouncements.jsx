import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaBullhorn } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";

const TeacherAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/announcements");
        setAnnouncements(res.data);
      } catch (err) {
        console.error("Error fetching announcements:", err);
      }
    };

    fetchAnnouncements();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      
      {/* ✅ Header */}
      <header className="bg-white shadow">
        <Header />
      </header>

      {/* ✅ Main Content */}
      <main className="flex-1 p-4 bg-gray-100">
        <div className="max-w-6xl mx-auto overflow-hidden bg-white shadow-md rounded-xl">
          
          {/* Announcements Top Section */}
          <div className="flex flex-col justify-between gap-4 p-4 text-white bg-blue-900 md:flex-row md:items-center rounded-t-xl">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-indigo-800 rounded-full">
                <FaBullhorn className="text-2xl text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold">📢 Announcements</h2>
                <p className="text-sm opacity-90">Latest news and updates from admin</p>
              </div>
            </div>
            <div className="text-sm font-medium text-white">
              Total: {announcements.length}
            </div>
          </div>

          {/* Announcements List */}
          <div className="p-6 bg-indigo-50 rounded-b-xl">
            {announcements.length === 0 ? (
              <p className="text-center text-gray-600">No announcements available.</p>
            ) : (
              <div className="space-y-4">
                {announcements.map((a, index) => (
                  <div
                    key={index}
                    className="p-4 transition bg-white border-l-4 border-blue-900 rounded-lg shadow-sm hover:shadow-md"
                  >
                    <h3 className="text-lg font-bold text-blue-900">{a.title}</h3>
                    <p className="mt-1 text-sm text-gray-700">{a.message}</p>
                    <p className="mt-2 text-xs text-gray-500">
                      📅 {new Date(a.date).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* ✅ Footer */}
      <footer className="bg-white border-t">
        <Footer />
      </footer>
    </div>
  );
};

export default TeacherAnnouncements;
