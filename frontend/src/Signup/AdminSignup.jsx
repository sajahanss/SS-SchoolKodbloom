import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminSignup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'admin',
    photo: null,
  });

  const [preview, setPreview] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo') {
      const file = files[0];
      setFormData((prev) => ({ ...prev, photo: file }));
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const form = new FormData();
      form.append('name', formData.name);
      form.append('email', formData.email);
      form.append('password', formData.password);
      form.append('role', formData.role);
      form.append('photo', formData.photo);

      const res = await axios.post('https://ss-schoolkodbloom.onrender.com/api/admins/signup', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (res.status === 201) {
        alert('✅ Admin signup successful!');
        navigate('/admin-login');
      }
    } catch (error) {
      console.error('Signup failed:', error);
      const errMsg =
        error?.response?.data?.message ||
        error?.message ||
        'Signup failed: Unknown error';

      alert('Signup failed: ' + errMsg);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-semibold text-center text-indigo-600">
          Admin Signup
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            required
            className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-900"
          />
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleChange}
            required
            className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {/* ✅ Preview selected image */}
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="object-cover w-24 h-24 mx-auto mt-2 border rounded-full"
            />
          )}

          <button
            type="submit"
            className="py-2 text-white bg-indigo-900 rounded hover:bg-indigo-800"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-700">
          Already have an account?{' '}
          <button
            type="button"
            onClick={() => navigate('/admin-login')}
            className="font-semibold text-indigo-900 hover:underline focus:outline-none"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

export default AdminSignup;
