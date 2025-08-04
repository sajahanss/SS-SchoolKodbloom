import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

function TeacherLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/teachers/login', {
        email,
        password,
      });

      const teacher = res.data.teacher;

      if (!teacher) {
        alert("❌ Login failed. No teacher data returned.");
        return;
      }

      // ✅ Store all required fields
      localStorage.setItem('teacherId', teacher._id);
      localStorage.setItem('teacherName', teacher.name);
      localStorage.setItem('teacherEmail', teacher.email);
      localStorage.setItem('teacherProfileImage', teacher.profileImage || '');
      localStorage.setItem('teacherClass', teacher.className || '');
      localStorage.setItem('teacherSection', teacher.section || '');
      localStorage.setItem('teacherSubject', teacher.subject || ''); // ✅ REQUIRED

      alert(res.data.message || '✅ Login successful!');
      navigate('/teacher-dashboard');
    } catch (error) {
      console.error("❌ Login Error:", error.response || error);
      alert(error.response?.data?.message || '❌ Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100">
      <Header />
      <div className="flex items-center justify-center flex-grow px-4">
        <div className="w-full max-w-md p-8 bg-white shadow-2xl bg-opacity-95 rounded-xl">
          <h2 className="mb-6 text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Teacher Login
          </h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TeacherLogin;
