import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ManageTeachers() {
  const [teachers, setTeachers] = useState([]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    className: '',
    section: '',
    subject: '', // ✅ Added subject
    profileImage: null,
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const res = await axios.get('https://ss-schoolkodbloom.onrender.com/api/teachers');
      const sorted = res.data.sort((a, b) => a.name.localeCompare(b.name));
      setTeachers(sorted);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch teachers');
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profileImage') {
      setForm({ ...form, profileImage: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value !== null) formData.append(key, value);
    });

    try {
      const res = await axios.post('https://ss-schoolkodbloom.onrender.com/api/teachers/add', formData);
      setTeachers([...teachers, res.data.teacher]);
      setForm({
        name: '',
        email: '',
        password: '',
        className: '',
        section: '',
        subject: '', // reset
        profileImage: null
      });
      setError(null);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Failed to add teacher');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this teacher?')) return;
    try {
      await axios.delete(`https://ss-schoolkodbloom.onrender.com/api/teachers/${id}`);
      setTeachers(teachers.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
      setError('Failed to delete teacher');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-1 p-4">
        <div className="max-w-6xl mx-auto overflow-hidden bg-white shadow-md rounded-xl">
          <div className="p-4 text-white bg-blue-900 rounded-t-lg">
            <h1 className="text-2xl font-bold">👩‍🏫 Teacher Management</h1>
            <p className="text-sm opacity-90">Add, view, and remove teacher records</p>
          </div>

          <div className="p-6 space-y-6 text-gray-800 bg-white border border-gray-200 rounded-b-xl">
            <div className="p-4 text-center bg-white border border-blue-100 rounded-lg shadow-sm">
              <strong className="text-lg text-blue-900">{teachers.length}</strong> teachers registered
            </div>

            {error && (
              <div className="p-3 text-sm text-red-700 bg-red-100 border border-red-200 rounded-md">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4 bg-white rounded-lg shadow-sm">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {['name', 'email', 'password'].map((field) => (
                  <div key={field}>
                    <label className="block mb-1 text-sm font-medium">
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    <input
                      type={field === 'password' ? 'password' : 'text'}
                      name={field}
                      value={form[field]}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
                    />
                  </div>
                ))}

                <div>
                  <label className="block mb-1 text-sm font-medium">Class</label>
                  <select
                    name="className"
                    value={form.className}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
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
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
                  >
                    <option value="">Select Section</option>
                    {['A', 'B', 'C'].map((sec) => (
                      <option key={sec} value={sec}>
                        {sec}
                      </option>
                    ))}
                  </select>
                </div>

                {/* ✅ Subject Field */}
                <div>
                  <label className="block mb-1 text-sm font-medium">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    placeholder="e.g., Math, English"
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
                  />
                </div>
              </div>

              {/* Profile Image Upload */}
              <div>
                <label className="block mb-1 text-sm font-medium">Profile Image</label>
                <div className="flex items-center gap-4 p-2 bg-gray-100 border border-gray-300 rounded-lg">
                  <div className="flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-200 rounded-full">
                    {form.profileImage ? (
                      <img
                        src={URL.createObjectURL(form.profileImage)}
                        alt="Preview"
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <span className="text-gray-400">N/A</span>
                    )}
                  </div>
                  <label className="px-3 py-1 text-white bg-blue-900 rounded cursor-pointer hover:bg-blue-900">
                    {form.profileImage ? 'Change' : 'Select'}
                    <input
                      type="file"
                      name="profileImage"
                      onChange={handleChange}
                      hidden
                      accept="image/*"
                    />
                  </label>
                  {form.profileImage && (
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, profileImage: null })}
                      className="text-xs text-gray-600 hover:text-gray-800"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-blue-900 rounded-md hover:bg-blue-900"
                >
                  Add Teacher
                </button>
              </div>
            </form>

            {/* Teacher List */}
            <div>
              <h2 className="mb-4 text-xl font-semibold text-gray-800">Teacher Records</h2>
              {teachers.length === 0 ? (
                <p className="text-center text-gray-500">No teachers registered yet.</p>
              ) : (
                <div className="space-y-4">
                  {teachers.map((t) => (
                    <div
                      key={t._id}
                      className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
                    >
                      <div className="flex items-center gap-4">
                        {t.profileImage ? (
                          <img
                            src={`https://ss-schoolkodbloom.onrender.com/uploads/${t.profileImage}`}
                            alt="Profile"
                            className="object-cover w-10 h-10 rounded-full"
                          />
                        ) : (
                          <div className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full">
                            <span className="text-gray-400">N/A</span>
                          </div>
                        )}
                        <div className="truncate">
                          <p className="font-medium text-gray-800">{t.name}</p>
                          <p className="text-sm text-gray-600">{t.email}</p>
                          <p className="text-xs text-gray-500">
                            Class {t.className || '—'} • Sec {t.section || '—'} • Subject {t.subject || '—'}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDelete(t._id)}
                        className="px-3 py-1 text-xs text-white bg-red-600 rounded-md hover:bg-red-700"
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
      <footer className="bg-white border-t border-gray-300">
        <Footer />
      </footer>
    </div>
  );
}

export default ManageTeachers;
