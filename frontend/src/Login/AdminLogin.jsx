import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header'; // ✅ Import Header

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://ss-schoolkodbloom.onrender.com/api/admins/login", {
        email,
        password,
      });

      if (res.data && res.data.admin) {
        localStorage.setItem("admin", JSON.stringify(res.data.admin));
        alert("✅ Login successful!");
        navigate('/admin-dashboard');
      } else {
        alert("⚠️ Login failed: Admin data not received.");
      }
    } catch (err) {
      console.error("Login error:", err);
      const message = err.response?.data?.message || "❌ Invalid email or password";
      alert(`Login failed: ${message}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100">
      {/* ✅ Header */}
      <Header />

      {/* ✅ Centered Form */}
      <div className="flex items-center justify-center flex-grow px-4">
        <div className="w-full max-w-md p-8 bg-white shadow-2xl rounded-xl bg-opacity-95">
          <h2 className="mb-6 text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Admin Login
          </h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
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
              className="w-full px-4 py-2 font-semibold text-white transition-all rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Login
            </button>
          </form>

          <p className="mt-4 text-sm text-center text-gray-700">
            Don’t have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/admin-signup')}
              className="font-semibold text-blue-600 hover:underline focus:outline-none"
            >
              Signup
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
