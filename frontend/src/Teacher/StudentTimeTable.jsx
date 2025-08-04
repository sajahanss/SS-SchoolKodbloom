import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaChalkboard } from 'react-icons/fa';
import Header from "../components/Header";
import Footer from "../components/Footer";

function ViewTimeTable() {
  const [timetable, setTimeTable] = useState([]);
  const teacherName = localStorage.getItem("teacherName"); // ✅ get from localStorage

  useEffect(() => {
    if (!teacherName) return;

    axios
      .get(`http://localhost:5000/api/timetable/teacher/${teacherName}`)
      .then((res) => setTimeTable(res.data))
      .catch((err) => console.error("Error fetching timetable:", err));
  }, [teacherName]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* ✅ Header */}
      <Header />

      <main className="flex-1 p-4">
        <div className="max-w-6xl mx-auto overflow-hidden bg-white shadow-md rounded-xl">
          {/* Header */}
          <div className="flex flex-col justify-between gap-4 p-4 text-white bg-blue-900 md:flex-row md:items-center rounded-t-xl">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-800 rounded-full">
                <FaChalkboard className="text-2xl text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold">📘 My Teaching Schedule</h2>
                <p className="text-sm opacity-90">
                  Hello {teacherName || 'Teacher'}, here is your class timetable.
                </p>
              </div>
            </div>
            <div className="text-sm font-medium text-white">
              Total Entries: {timetable.length}
            </div>
          </div>

          {/* Table */}
          <div className="p-6 bg-indigo-50 rounded-b-xl">
            {timetable.length === 0 ? (
              <p className="text-center text-gray-600">No timetable entries found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left bg-white border border-collapse rounded shadow-sm">
                  <thead className="text-indigo-800 bg-indigo-100">
                    <tr>
                      <th className="px-4 py-3 border border-indigo-200">📅 Day</th>
                      <th className="px-4 py-3 border border-indigo-200">⏰ Period</th>
                      <th className="px-4 py-3 border border-indigo-200">🏫 Class</th>
                      <th className="px-4 py-3 border border-indigo-200">🔢 Section</th>
                      <th className="px-4 py-3 border border-indigo-200">📖 Subject</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    {timetable.map((entry, index) => (
                      <tr key={index} className="transition-all hover:bg-indigo-50">
                        <td className="px-4 py-2 border border-indigo-100">{entry.day}</td>
                        <td className="px-4 py-2 border border-indigo-100">{entry.period}</td>
                        <td className="px-4 py-2 border border-indigo-100">{entry.className}</td>
                        <td className="px-4 py-2 border border-indigo-100">{entry.section}</td>
                        <td className="px-4 py-2 border border-indigo-100">{entry.subject}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* ✅ Footer */}
      <Footer />
    </div>
  );
}

export default ViewTimeTable;
