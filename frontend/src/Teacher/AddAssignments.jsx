import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AddAssignments = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState({});

  const teacherId = localStorage.getItem('teacherId');
  const className = localStorage.getItem('teacherClass');
  const section = localStorage.getItem('teacherSection');

  // ✅ Fetch Assignments
  const fetchAssignments = async () => {
    try {
      const res = await axios.get(`https://ss-schoolkodbloom.onrender.com/api/assignments/${className}/${section}`);
      setAssignments(res.data);
    } catch (err) {
      console.error('Error fetching assignments:', err);
    }
  };

  // ✅ Fetch Submissions (Fixed)
  const fetchSubmissions = async () => {
    try {
      const res = await axios.get(`https://ss-schoolkodbloom.onrender.com/api/submissions/${className}/${section}`);
      const grouped = res.data.reduce((acc, sub) => {
        const assignmentId = sub.assignmentId?._id || sub.assignmentId;
        if (!acc[assignmentId]) acc[assignmentId] = [];
        acc[assignmentId].push(sub);
        return acc;
      }, {});
      setSubmissions(grouped);
    } catch (err) {
      console.error('Error fetching submissions:', err);
    }
  };

  useEffect(() => {
    if (className && section) {
      fetchAssignments();
      fetchSubmissions();
    }
  }, [className, section]);

  // ✅ Submit Assignment
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!teacherId || !className || !section) {
      alert("Missing teacher or class information.");
      return;
    }
    try {
      const res = await axios.post('https://ss-schoolkodbloom.onrender.com/api/assignments/add', {
        title,
        description,
        dueDate,
        teacher: teacherId,
        className,
        section,
      });
      alert(res.data.message || 'Assignment added!');
      setTitle('');
      setDescription('');
      setDueDate('');
      fetchAssignments();
    } catch (err) {
      console.error('Error:', err);
      alert('Failed to add assignment');
    }
  };

  // ✅ Delete Assignment
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this assignment?")) return;
    try {
      await axios.delete(`https://ss-schoolkodbloom.onrender.com/api/assignments/${id}`);
      alert("Assignment deleted");
      fetchAssignments();
      fetchSubmissions();
    } catch (err) {
      console.error('Delete error:', err);
      alert("Failed to delete assignment");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="p-4">
        <div className="max-w-6xl mx-auto bg-white shadow-md rounded-xl">
          <div className="flex items-center justify-between p-4 text-white bg-blue-900 rounded-t-xl">
            <h1 className="text-2xl font-bold">Assignment Management</h1>
            <p>Class: {className} | Section: {section}</p>
          </div>

          <div className="p-6">
            {/* Assignment Form */}
            <form onSubmit={handleSubmit} className="mb-8 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="3"
                  className="w-full px-3 py-2 border rounded-md"
                  required
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Due Date</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button type="submit" className="px-5 py-2 text-white bg-blue-900 rounded-md">
                  Add Assignment
                </button>
              </div>
            </form>

            {/* Assignment Records */}
            <h2 className="mb-4 text-xl font-semibold text-gray-800">Assignment Records</h2>
            {assignments.length === 0 ? (
              <p className="text-center text-gray-500">No assignments available</p>
            ) : (
              <div className="space-y-6">
                {assignments.map((a) => (
                  <div key={a._id} className="p-4 border rounded-md shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{a.title}</h3>
                        <p className="text-sm text-gray-500">{a.description}</p>
                        <p className="text-xs text-gray-400">
                          Due: {new Date(a.dueDate).toLocaleDateString('en-IN')}
                        </p>
                      </div>
                      <button onClick={() => handleDelete(a._id)} className="text-sm text-red-600 hover:underline">
                        Delete
                      </button>
                    </div>

                    {/* Submissions */}
                    <div className="mt-4">
                      <h4 className="mb-2 text-sm font-medium text-gray-700">
                        Submissions ({submissions[a._id]?.length || 0})
                      </h4>
                      {submissions[a._id]?.length > 0 ? (
                        <ul className="space-y-2 text-sm">
                          {submissions[a._id].map((sub) => (
                            <li key={sub._id} className="flex justify-between pb-1 border-b">
                              <span>
                                {sub.studentName} ({sub.studentRoll}) –{' '}
                                <span className="text-xs text-gray-500">
                                  {new Date(sub.uploadedAt).toLocaleDateString()}
                                </span>
                              </span>
                              <a
                                href={`https://ss-schoolkodbloom.onrender.com/uploads/submissions/${sub.fileUrl}`}
                                target="_blank"
                                rel="noreferrer"
                                className="text-blue-900 hover:underline"
                              >
                                View File
                              </a>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm italic text-gray-400">No student submissions yet.</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddAssignments;
