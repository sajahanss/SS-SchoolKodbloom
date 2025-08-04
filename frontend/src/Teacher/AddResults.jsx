
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

const TeacherAddResult = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    rollno: '',
    subject: '',
    marksObtained: '',
    totalMarks: 100,
    grade: '',
    className: '',
    section: '',
    examDate: '',
    remarks: '',
  });

  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  // Fetch existing results on mount
  useEffect(() => {
    axios.get('https://ss-schoolkodbloom.onrender.com/api/results')
      .then((res) => setResults(res.data))
      .catch(() => setError('❌ Failed to fetch results. Please try again later.'));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('https://ss-schoolkodbloom.onrender.com/api/results', formData);
      setResults([...results, res.data]);
      setFormData({
        studentName: '',
        rollno: '',
        subject: '',
        marksObtained: '',
        totalMarks: 100,
        grade: '',
        className: '',
        section: '',
        examDate: '',
        remarks: '',
      });
    } catch (err) {
      setError('❌ Failed to add result.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* ✅ Header */}
      <header className="bg-white shadow">
        <Header />
      </header>

      {/* ✅ Main Content */}
      <main className="flex-grow p-6 bg-gray-50">
        <h2 className="mb-4 text-2xl font-bold">📥 Add Student Result</h2>

        {error && <p className="mb-3 text-red-600">{error}</p>}

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 p-4 mb-8 bg-white rounded shadow md:grid-cols-3">
          <input name="studentName" value={formData.studentName} onChange={handleChange} placeholder="Student Name" required className="p-2 border rounded" />
          <input name="rollno" value={formData.rollno} onChange={handleChange} placeholder="Roll Number" required className="p-2 border rounded" />
          <input name="subject" value={formData.subject} onChange={handleChange} placeholder="Subject" required className="p-2 border rounded" />
          <input name="marksObtained" value={formData.marksObtained} onChange={handleChange} type="number" placeholder="Marks Obtained" required className="p-2 border rounded" />
          <input name="totalMarks" value={formData.totalMarks} onChange={handleChange} type="number" placeholder="Total Marks" required className="p-2 border rounded" />
          <input name="grade" value={formData.grade} onChange={handleChange} placeholder="Grade" className="p-2 border rounded" />
          <input name="className" value={formData.className} onChange={handleChange} placeholder="Class" className="p-2 border rounded" />
          <input name="section" value={formData.section} onChange={handleChange} placeholder="Section" className="p-2 border rounded" />
          <input name="examDate" value={formData.examDate} onChange={handleChange} type="date" className="p-2 border rounded" />
          <input name="remarks" value={formData.remarks} onChange={handleChange} placeholder="Remarks" className="col-span-2 p-2 border rounded md:col-span-1" />
          <button type="submit" className="col-span-2 p-2 text-white bg-blue-900 rounded md:col-span-3 hover:bg-blue-800">Add Result</button>
        </form>

        <h3 className="mb-4 text-xl font-semibold">📋 All Results</h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {results.length > 0 ? results.map((result, index) => (
            <div key={index} className="p-4 transition bg-white border rounded-lg shadow hover:shadow-md">
              <p><strong>Name:</strong> {result.studentName}</p>
              <p><strong>Roll No:</strong> {result.rollno}</p>
              <p><strong>Subject:</strong> {result.subject}</p>
              <p><strong>Marks:</strong> {result.marksObtained} / {result.totalMarks}</p>
              <p><strong>Grade:</strong> {result.grade}</p>
              <p><strong>Class:</strong> {result.className}</p>
              <p><strong>Section:</strong> {result.section}</p>
              <p><strong>Exam Date:</strong> {new Date(result.examDate).toLocaleDateString()}</p>
              <p><strong>Remarks:</strong> {result.remarks || '—'}</p>
            </div>
          )) : (
            <p>No results found.</p>
          )}
        </div>
      </main>

      {/* ✅ Footer */}
      <footer className="bg-white border-t">
        <Footer />
            </footer>
    </div>
  );
};

export default TeacherAddResult;
