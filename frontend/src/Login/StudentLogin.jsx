import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

function StudentLogin() {
  const [rollno, setRollno] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!rollno || !password) {
      alert('⚠️ Please fill in both fields.');
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/students/login', {
        rollno,
        password,
      });

      const student = res.data.student;

      if (!student || !student._id) {
        alert('❌ Login succeeded but missing student ID. Please contact admin.');
        return;
      }

      // ✅ Store correctly in localStorage
      localStorage.setItem('studentId', student._id);
      localStorage.setItem('studentName', student.name);
      localStorage.setItem('studentProfileImage', student.profileImage || '');
      localStorage.setItem('studentClass', student.className);
      localStorage.setItem('studentSection', student.section);
      localStorage.setItem('studentRollno', student.rollno); // ✅ lowercase 'n'
      localStorage.setItem('studentEmail', student.email);

      console.log("✅ Stored student ID:", student._id);

      alert(res.data.message || '✅ Login successful!');
      navigate('/student-dashboard');
    } catch (err) {
      console.error('❌ Login error:', err);
      alert(err.response?.data?.message || '❌ Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100">
      <Header />
      <div className="flex items-center justify-center flex-grow px-4">
        <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-xl bg-opacity-95">
          <h2 className="mb-6 text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Student Login
          </h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Roll Number</label>
              <input
                type="text"
                value={rollno}
                onChange={(e) => setRollno(e.target.value)}
                placeholder="Enter Roll Number"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full px-4 py-2 font-semibold text-white transition-all duration-300 rounded-lg 
                ${loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'}`}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default StudentLogin;
