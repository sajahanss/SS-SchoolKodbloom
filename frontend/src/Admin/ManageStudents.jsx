import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header'; // ✅ Added Header import
import Footer from '../components/Footer';

function ManageStudents() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    name: '',
    rollno: '',
    email: '',
    password: '',
    profileImage: null,
    className: '',
    section: '',
  });
  const [error, setError] = useState(null);

  const theme = {
    primary: 'bg-blue-600 hover:bg-blue-700',
    secondary: 'bg-gray-200 hover:bg-gray-300',
    danger: 'bg-red-600 hover:bg-red-700',
    text: 'text-gray-800',
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get('https://ss-schoolkodbloom.onrender.com/api/students');
      setStudents(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch students');
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

  const handleAddStudent = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([k, v]) => v != null && formData.append(k, v));
    try {
      const res = await axios.post('https://ss-schoolkodbloom.onrender.com/api/students/add', formData);
      setStudents([res.data, ...students]);
      setForm({
        name: '',
        rollno: '',
        email: '',
        password: '',
        profileImage: null,
        className: '',
        section: '',
      });
      setError(null);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to add student');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this student?')) return;
    try {
      await axios.delete(`https://ss-schoolkodbloom.onrender.com/api/students/${id}`);
      setStudents(students.filter((s) => s._id !== id));
    } catch (err) {
      console.error(err);
      setError('Failed to delete student');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* ✅ Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 p-4">
        <div className="max-w-6xl mx-auto overflow-hidden bg-white shadow-md rounded-xl">
          {/* Page Header */}
          <div className="p-4 text-white bg-blue-900 rounded-t-lg">
            <h1 className="text-2xl font-bold">👩‍🎓 Student Management</h1>
            <p className="text-sm opacity-90">Add, view, and remove student records</p>
          </div>

          {/* Page Content */}
          <div className="p-6 space-y-6 text-gray-800 bg-white border border-gray-200 rounded-b-xl">
            {/* Count */}
            <div className="p-4 text-center bg-white border border-blue-100 rounded-lg shadow-sm">
              <strong className="text-lg text-blue-900">{students.length}</strong> students registered
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 text-sm text-red-700 bg-red-100 border border-red-200 rounded-md">
                {error}
              </div>
            )}

            {/* Add Student Form */}
            <form onSubmit={handleAddStudent} className="p-6 space-y-4 bg-white rounded-lg shadow-sm">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {['name','rollno','email','password'].map((field) => (
                  <div key={field}>
                    <label className="block mb-1 text-sm font-medium">
                      {field === 'rollno' ? 'Roll Number' : field.charAt(0).toUpperCase()+field.slice(1)}
                    </label>
                    <input
                      type={field === 'password' ? 'password' : 'text'}
                      name={field}
                      value={form[field]}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
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
                    {[...Array(10)].map((_,i) => (
                      <option key={i+1} value={i+1}>{i+1}</option>
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
                    {['A','B','C'].map((sec) => (
                      <option key={sec} value={sec}>{sec}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Profile Image */}
              <div>
                <label className="block mb-1 text-sm font-medium">Profile Image</label>
                <div className="flex items-center gap-4 p-2 bg-gray-100 border border-gray-300 rounded-lg">
                  <div className="flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-200 rounded-full">
                    {form.profileImage ? (
                      <img
                        src={URL.createObjectURL(form.profileImage)}
                        alt=""
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <span className="text-gray-400">N/A</span>
                    )}
                  </div>
                  <label className="px-3 py-1 text-white bg-blue-900 rounded cursor-pointer hover:bg-blue-900">
                    Browse
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

              {/* Submit & Reset */}
              <div className="flex justify-end gap-2">
                <button
                  type="reset"
                  onClick={() =>
                    setForm({
                      name: '',
                      rollno: '',
                      email: '',
                      password: '',
                      profileImage: null,
                      className: '',
                      section: '',
                    })
                  }
                  className="px-4 py-2 text-gray-800 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-blue-900 rounded-md hover:bg-blue-900"
                >
                  Add Student
                </button>
              </div>
            </form>

            {/* Student List */}
            <div>
              <h2 className="mb-4 text-xl font-semibold">Student Records</h2>
              {students.length === 0 ? (
                <p className="py-8 text-center text-gray-500">No students registered yet.</p>
              ) : (
                <div className="space-y-4">
                  {students.map((s) => (
                    <div
                      key={s._id}
                      className="flex items-center justify-between p-4 bg-white border rounded-lg shadow-sm"
                    >
                      <div className="flex items-center gap-4">
                        {s.profileImage ? (
                          <img
                            src={`https://ss-schoolkodbloom.onrender.com/uploads/${s.profileImage}`}
                            alt=""
                            className="object-cover w-10 h-10 rounded-full"
                          />
                        ) : (
                          <div className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full">
                            <span className="text-gray-400">N/A</span>
                          </div>
                        )}
                        <div className="truncate">
                          <p className="font-medium">{s.name}</p>
                          <p className="text-sm text-gray-600">Roll: {s.rollno}</p>
                          <p className="text-xs text-gray-500">
                            Class {s.className || '—'} • Sec {s.section || '—'}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDelete(s._id)}
                        className="px-3 py-1 text-xs text-white bg-red-600 rounded hover:bg-red-700"
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

      {/* ✅ Footer */}
      <footer className="bg-white border-t border-gray-300">
        <Footer />
      </footer>
    </div>
  );
}

export default ManageStudents;
