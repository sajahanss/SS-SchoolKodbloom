import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCalendarAlt } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Holidays = () => {
  const [holidays, setHolidays] = useState([]);
  const teacherName = localStorage.getItem('teacherName');

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/holidays");
        setHolidays(res.data);
      } catch (err) {
        console.error("Error fetching holidays:", err);
      }
    };
    fetchHolidays();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      
      {/* ✅ Header */}
      <header className="bg-white shadow">
        <Header />
      </header>

      {/* ✅ Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        <div className="max-w-6xl mx-auto overflow-hidden bg-white shadow-md rounded-xl">
          
          {/* Top Bar */}
          <div className="flex flex-col justify-between gap-4 p-4 text-white bg-blue-900 md:flex-row md:items-center rounded-t-xl">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-800 rounded-full">
                <FaCalendarAlt className="text-2xl text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold">📅 Holiday List</h2>
                <p className="text-sm opacity-90">
                  Hello {teacherName || "Teacher"} — upcoming holidays listed here
                </p>
              </div>
            </div>
            <div className="text-sm font-medium text-white">
              Total Holidays: {holidays.length}
            </div>
          </div>

          {/* Table Section */}
          <div className="p-6 text-sm bg-indigo-50 rounded-b-xl">
            {holidays.length === 0 ? (
              <p className="text-center text-gray-600">No holidays found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left bg-white border border-collapse rounded shadow-sm">
                  <thead className="text-blue-900 bg-indigo-100">
                    <tr>
                      <th className="px-4 py-3 border border-indigo-200">🎉 Title</th>
                      <th className="px-4 py-3 border border-indigo-200">📆 Date</th>
                      <th className="px-4 py-3 border border-indigo-200">📝 Description</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-800">
                    {holidays.map((holiday) => (
                      <tr
                        key={holiday._id}
                        className="transition-all duration-150 hover:bg-indigo-50"
                      >
                        <td className="px-4 py-2 font-medium border border-indigo-100">{holiday.title}</td>
                        <td className="px-4 py-2 border border-indigo-100">
                          {new Date(holiday.date).toLocaleDateString("en-IN", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </td>
                        <td className="px-4 py-2 border border-indigo-100">{holiday.description}</td>
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
};

export default Holidays;
