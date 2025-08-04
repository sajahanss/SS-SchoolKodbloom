import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from "../components/Header";
import Footer from "../components/Footer";

function StudentSubjects({ className, section }) {
  const [subjects, setSubjects] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/subjects?className=${className}&section=${section}`
      );
      setSubjects(res.data.data || res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to load subjects');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* ✅ Header */}
      <header className="bg-white shadow">
        <Header />
      </header>

      {/* ✅ Main Content */}
      <main className="flex-1 w-full px-4 py-6">
        <div className="max-w-6xl p-6 mx-auto bg-white border border-gray-200 rounded-lg shadow-sm">
          {/* Page Title */}
          <div className="pb-4 mb-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-blue-700">
              📘 Subjects for Class {className} / Section {section}
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Below are the subjects assigned to you this academic year.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 border border-red-200 rounded-md">
              {error}
            </div>
          )}

          {/* Subject Cards */}
          {subjects.length === 0 ? (
            <div className="p-6 text-center text-gray-500 border border-gray-200 rounded-md bg-gray-50">
              No subjects assigned yet.
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2">
              {subjects.map((subject) => (
                <div
                  key={subject._id}
                  className="p-4 transition border border-indigo-200 rounded-lg shadow bg-indigo-50 hover:shadow-md"
                >
                  <h2 className="text-lg font-semibold text-indigo-800">
                    {subject.subjectName}
                  </h2>
                  <p className="text-sm text-gray-600">
                    Teacher: <span className="font-medium">{subject.teacher?.name || 'N/A'}</span>
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* ✅ Footer */}
      <footer className="bg-white border-t">
        <Footer />
      </footer>
    </div>
  );
}

export default StudentSubjects;
