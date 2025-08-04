import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

function StudentViewAttendance() {
  const [attendance, setAttendance] = useState([]);
  const [groupedAttendance, setGroupedAttendance] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    const studentId = localStorage.getItem("studentId");

    if (!studentId) {
      setError("⚠️ Student ID not found. Please login again.");
      return;
    }

    axios
      .get(`https://ss-schoolkodbloom.onrender.com/api/attendance/student/${studentId}`)
      .then((res) => {
        const data = res.data;

        if (!Array.isArray(data) || data.length === 0) {
          setAttendance([]);
          setGroupedAttendance({});
          return;
        }

        setAttendance(data);

        const grouped = {};
        data.forEach((record) => {
          if (!grouped[record.date]) {
            grouped[record.date] = [];
          }
          grouped[record.date].push(record);
        });

        setGroupedAttendance(grouped);
      })
      .catch((err) => {
        console.error("❌ Fetch Error:", err);
        setError("❌ Server error, please try again.");
      });
  }, []);

  const sortedDates = Object.keys(groupedAttendance).sort(
    (a, b) => new Date(b) - new Date(a)
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* ✅ Header */}
      <header className="bg-white shadow">
        <Header />
      </header>

      {/* ✅ Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        <div className="max-w-6xl mx-auto overflow-hidden bg-white shadow-lg rounded-xl">
          <div className="p-4 text-white bg-blue-900 rounded-t-xl">
            <h1 className="text-2xl font-bold">📘 My Period-Wise Attendance</h1>
            <p className="text-sm text-blue-100">
              Detailed view of your attendance subject-wise and teacher-wise
            </p>
          </div>

          <div className="p-6 space-y-8 bg-indigo-50 rounded-b-xl">
            {error && (
              <p className="font-semibold text-center text-red-600">{error}</p>
            )}

            {!error && sortedDates.length === 0 ? (
              <p className="text-center text-gray-600">
                📭 No attendance records found.
              </p>
            ) : (
              sortedDates.map((date) => (
                <div key={date}>
                  <h3 className="mb-2 text-lg font-semibold text-blue-900">
                    📅 Date: {new Date(date).toLocaleDateString()}
                  </h3>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left bg-white border border-gray-300 rounded">
                      <thead className="text-gray-800 bg-blue-100">
                        <tr>
                          <th className="px-4 py-2 border">⏰ Period</th>
                          <th className="px-4 py-2 border">🕒 Time Slot</th>
                          <th className="px-4 py-2 border">📖 Subject</th>
                          <th className="px-4 py-2 border">👨‍🏫 Teacher</th>
                          <th className="px-4 py-2 border">📌 Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {groupedAttendance[date].map((entry, index) => (
                          <tr key={index} className="text-sm text-gray-700">
                            <td className="px-4 py-2 text-center border">{entry.period}</td>
                            <td className="px-4 py-2 border">{entry.timeSlot}</td>
                            <td className="px-4 py-2 border">{entry.subject}</td>
                            <td className="px-4 py-2 border">{entry.teacherName}</td>
                            <td
                              className={`px-4 py-2 border font-semibold ${
                                entry.status === "Present"
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              {entry.status}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))
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
}

export default StudentViewAttendance;
