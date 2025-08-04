import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ViewTimeTable() {
  const [timetable, setTimeTable] = useState([]);
  const [error, setError] = useState('');

  const className = localStorage.getItem('studentClass');
  const section = localStorage.getItem('studentSection');

  useEffect(() => {
    if (className && section) {
      axios
        .get(`https://ss-schoolkodbloom.onrender.com/api/timetable/student/${className}/${section}`)
        .then((res) => {
          setTimeTable(res.data);
          setError('');
        })
        .catch((err) => {
          console.error(err);
          setError('❌ Failed to load timetable. Please try again.');
        });
    }
  }, [className, section]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* ✅ Header */}
      <header className="bg-white shadow">
        <Header />
      </header>

      {/* ✅ Main Content */}
      <main className="flex-1 p-4">
        <div className="max-w-6xl mx-auto overflow-hidden bg-white shadow-md rounded-xl">
          {/* Page Title */}
          <div className="p-4 text-white bg-blue-900 rounded-t-xl">
            <h1 className="text-2xl font-bold">📅 My Class Timetable</h1>
            <p className="text-sm opacity-90">Daily schedule for your class</p>
          </div>

          {/* Content Area */}
          <div className="p-6 border border-indigo-200 bg-indigo-50 rounded-b-xl">
            {error ? (
              <p className="text-red-600">{error}</p>
            ) : timetable.length === 0 ? (
              <p className="text-gray-600">No timetable available for your class and section.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left border border-gray-300 rounded">
                  <thead className="text-gray-700 bg-blue-100">
                    <tr>
                      <th className="px-4 py-2 border">📆 Day</th>
                      <th className="px-4 py-2 border">⏰ Period</th>
                      <th className="px-4 py-2 border">📘 Subject</th>
                      <th className="px-4 py-2 border">👨‍🏫 Teacher</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {timetable.map((entry, index) => (
                      <tr key={index} className="text-center">
                        <td className="px-4 py-2 border">{entry.day}</td>
                        <td className="px-4 py-2 border">{entry.period}</td>
                        <td className="px-4 py-2 border">{entry.subject}</td>
                        <td className="px-4 py-2 border">{entry.teacherName}</td>
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
      <footer className="bg-white border-t">
        <Footer />
      </footer>
    </div>
  );
}

export default ViewTimeTable;
