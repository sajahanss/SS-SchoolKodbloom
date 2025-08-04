import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";     // ✅ Add header
import Footer from "../components/Footer";     // ✅ Add footer

const Holidays = () => {
  const [holidays, setHolidays] = useState([]);

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
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* ✅ Header */}
      <header className="shadow">
        <Header />
      </header>

      {/* ✅ Main Content */}
      <main className="flex-1 p-4">
        <div className="max-w-6xl mx-auto overflow-hidden bg-white shadow-md rounded-xl">
          {/* Title Section */}
          <div className="p-4 text-white bg-blue-900 rounded-t-xl">
            <h1 className="text-2xl font-bold">📅 Holiday List</h1>
            <p className="text-sm opacity-90">Check upcoming holidays and breaks</p>
          </div>

          {/* Table Section */}
          <div className="p-6 border border-indigo-200 bg-indigo-50 rounded-b-xl">
            {holidays.length === 0 ? (
              <p className="text-gray-600">No holidays found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left border border-gray-300 rounded-lg">
                  <thead className="text-gray-700 bg-blue-100">
                    <tr>
                      <th className="px-4 py-2 border">🏷️ Title</th>
                      <th className="px-4 py-2 border">📆 Date</th>
                      <th className="px-4 py-2 border">📝 Description</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {holidays.map((holiday) => (
                      <tr key={holiday._id}>
                        <td className="px-4 py-2 font-medium text-blue-900 border">
                          {holiday.title}
                        </td>
                        <td className="px-4 py-2 border">
                          {new Date(holiday.date).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </td>
                        <td className="px-4 py-2 border">{holiday.description}</td>
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
      <footer className="bg-white border-t shadow-inner">
        <Footer />
      </footer>
    </div>
  );
};

export default Holidays;
