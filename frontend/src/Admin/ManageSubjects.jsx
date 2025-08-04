import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header'; // ✅ Import Header
import Footer from '../components/Footer'; // ✅ Import Footer

function ManageSubjects() {
  const [subjects, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    subjectName: '',
    teacherId: '',
    className: '',
    section: '',
    subjectImage: null,
  });

  const theme = {
    primary: 'bg-blue-600 hover:bg-blue-700',
    secondary: 'bg-gray-200 hover:bg-gray-300',
    danger: 'bg-red-600 hover:bg-red-700',
    text: 'text-gray-800',
  };

  useEffect(() => {
    fetchSubjects();
    fetchTeachers();
  }, []);

  const fetchSubjects = async () => {
    try {
      const res = await axios.get('https://ss-schoolkodbloom.onrender.com/api/subjects');
      setSubjects(res.data.data || res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch subjects');
    }
  };

  const fetchTeachers = async () => {
    try {
      const res = await axios.get('https://ss-schoolkodbloom.onrender.com/api/teachers');
      setTeachers(res.data.data || res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch teachers');
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'subjectImage') {
      setForm({ ...form, subjectImage: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleAddSubject = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('subjectName', form.subjectName);
    formData.append('className', form.className);
    formData.append('section', form.section);
    formData.append('teacher', form.teacherId);
    if (form.subjectImage) formData.append('subjectImage', form.subjectImage);

    try {
      const res = await axios.post('https://ss-schoolkodbloom.onrender.com/api/subjects/add', formData);
      setSubjects([...subjects, res.data.data || res.data.subject]);
      setForm({ subjectName: '', teacherId: '', className: '', section: '', subjectImage: null });
      setError(null);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to add subject');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this subject?')) return;
    try {
      await axios.delete(`https://ss-schoolkodbloom.onrender.com/api/subjects/${id}`);
      setSubjects(subjects.filter((s) => s._id !== id));
    } catch (err) {
      console.error(err);
      setError('Failed to delete subject');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* ✅ Global Header */}
      <Header />

      <main className="flex-1 p-4">
        <div className="max-w-6xl mx-auto overflow-hidden bg-white shadow-md rounded-xl">
          <div className="p-4 text-white bg-blue-900 rounded-t-lg">
            <h1 className="text-2xl font-bold">📚 Subject Management</h1>
            <p className="text-sm opacity-90">Add, view, and manage subjects</p>
          </div>

          <div className="p-6 space-y-6 bg-white rounded-b-xl">
            <div className="p-3 text-center bg-white border border-blue-100 rounded-lg shadow-sm">
              <span className="text-lg">
                <strong className="text-blue-900">{subjects.length}</strong> subjects registered
              </span>
            </div>

            {error && (
              <div className="p-3 text-sm text-red-700 bg-red-100 border border-red-200 rounded-md">
                {error}
              </div>
            )}

            <form onSubmit={handleAddSubject} className="p-4 space-y-4 bg-white rounded-lg shadow-sm">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block mb-1 text-sm font-medium">Subject Name</label>
                  <input
                    type="text"
                    name="subjectName"
                    value={form.subjectName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium">Class</label>
                  <select
                    name="className"
                    value={form.className}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
                  >
                    <option value="">Select Class</option>
                    {[...Array(10)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium">Section</label>
                  <select
                    name="section"
                    value={form.section}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
                  >
                    <option value="">Select Section</option>
                    {['A', 'B', 'C'].map((sec) => (
                      <option key={sec} value={sec}>
                        {sec}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium">Teacher</label>
                  <select
                    name="teacherId"
                    value={form.teacherId}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
                  >
                    <option value="">Select Teacher</option>
                    {teachers.map((t) => (
                      <option key={t._id} value={t._id}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium">Subject Image</label>
                <input type="file" name="subjectImage" onChange={handleChange} accept="image/*" />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setForm({
                      subjectName: '',
                      teacherId: '',
                      className: '',
                      section: '',
                      subjectImage: null,
                    })
                  }
                  className={`px-4 py-2 rounded-md ${theme.secondary} ${theme.text}`}
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className={`px-4 py-2 text-white rounded-md ${theme.primary}`}
                >
                  Add Subject
                </button>
              </div>
            </form>

            <div>
              <h2 className="mb-4 text-xl font-semibold">📋 Subject Records</h2>
              {subjects.length === 0 ? (
                <p className="text-gray-500">No subjects registered yet.</p>
              ) : (
                <div className="space-y-4">
                  {subjects.map((s) => (
                    <div
                      key={s._id}
                      className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
                    >
                      <div className="flex items-center gap-4">
                        {s.subjectImage ? (
                          <img
                            src={`https://ss-schoolkodbloom.onrender.com/uploads/${s.subjectImage}`}
                            alt="Subject"
                            className="object-cover w-12 h-12 rounded-md"
                          />
                        ) : (
                          <div className="flex items-center justify-center w-12 h-12 bg-gray-200 rounded-md">
                            <span className="text-gray-400">N/A</span>
                          </div>
                        )}
                        <div className="text-sm">
                          <p><strong>Subject:</strong> {s.subjectName}</p>
                          <p><strong>Teacher:</strong> {s.teacher?.name || '—'}</p>
                          <p><strong>Class:</strong> {s.className}, <strong>Section:</strong> {s.section}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDelete(s._id)}
                        className={`px-3 py-1 text-xs rounded ${theme.danger} text-white`}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* ✅ Global Footer */}
      <footer className="bg-white border-t border-gray-300">
        <Footer />
      </footer>
    </div>
  );
}

export default ManageSubjects;
