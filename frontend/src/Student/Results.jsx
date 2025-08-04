import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

const StudentResult = () => {
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axios.get('https://ss-schoolkodbloom.onrender.com/api/results');
        const sortedResults = res.data.sort((a, b) => new Date(b.examDate) - new Date(a.examDate));
        setResults(sortedResults);
      } catch (err) {
        console.error("Error fetching results:", err);
        setError("❌ Failed to fetch results. Please try again later.");
      }
    };
    fetchResults();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* ✅ Header */}
      <header className="bg-white shadow">
        <Header />
      </header>

      <main className="flex-grow p-4">
        <h2 className="mb-4 text-xl font-bold">Student Results</h2>

        {error && (
          <div className="mb-4 font-semibold text-red-600">
            {error}
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full border border-collapse border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Roll No</th>
                <th className="p-2 border">Subject</th>
                <th className="p-2 border">Marks</th>
                <th className="p-2 border">Total</th>
                <th className="p-2 border">Grade</th>
                <th className="p-2 border">Class</th>
                <th className="p-2 border">Section</th>
                <th className="p-2 border">Exam Date</th>
                <th className="p-2 border">Remarks</th>
              </tr>
            </thead>
            <tbody>
              {results.length > 0 ? (
                results.map((result, index) => (
                  <tr key={index} className="text-center">
                    <td className="p-2 border">{result.studentName}</td>
                    <td className="p-2 border">{result.rollno}</td>
                    <td className="p-2 border">{result.subject}</td>
                    <td className="p-2 border">{result.marksObtained}</td>
                    <td className="p-2 border">{result.totalMarks}</td>
                    <td className="p-2 border">{result.grade}</td>
                    <td className="p-2 border">{result.className}</td>
                    <td className="p-2 border">{result.section}</td>
                    <td className="p-2 border">
                      {result.examDate ? new Date(result.examDate).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="p-2 border">{result.remarks || '—'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="p-4 text-center text-gray-500">
                    No results available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* ✅ Footer */}
      <footer className="bg-white border-t">
        <Footer />
      </footer>
    </div>
  );
};

export default StudentResult;
