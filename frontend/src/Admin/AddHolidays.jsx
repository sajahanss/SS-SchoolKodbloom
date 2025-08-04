import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header"; // ✅ Added Header
import Footer from "../components/Footer";

const AddHolidays = () => {
  const [form, setForm] = useState({
    title: "",
    date: "",
    description: ""
  });
  const [holidays, setHolidays] = useState([]);

  const theme = {
    primary: 'bg-blue-600 hover:bg-blue-700',
    danger: 'bg-red-600 hover:bg-red-700',
    border: 'border-gray-300',
  };

  useEffect(() => {
    fetchHolidays();
  }, []);

  const fetchHolidays = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/holidays");
      setHolidays(res.data);
    } catch (err) {
      console.error("Error fetching holidays:", err);
      alert("Failed to fetch holidays");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/holidays/add", form);
      alert("✅ Holiday added successfully!");
      resetForm();
      fetchHolidays();
    } catch (err) {
      console.error("Failed to add holiday:", err);
      alert(err.response?.data?.message || "Failed to add holiday");
    }
  };

  const resetForm = () => {
    setForm({
      title: "",
      date: "",
      description: ""
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this holiday?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/holidays/delete/${id}`);
      alert("❌ Holiday deleted successfully!");
      fetchHolidays();
    } catch (err) {
      console.error("Failed to delete holiday:", err);
      alert("Failed to delete holiday");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* ✅ Global Header */}
      <Header />

      {/* ✅ Main Section */}
      <main className="flex-1 px-4 py-6">
        <div className="max-w-5xl mx-auto overflow-hidden bg-white shadow-md rounded-xl">
          {/* Title */}
          <div className="p-4 text-white bg-blue-900 rounded-t-md">
            <h1 className="text-2xl font-bold">Holiday Management</h1>
          </div>

          {/* Form Section */}
          <div className="p-6">
            <form onSubmit={handleSubmit} className="mb-6 space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Holiday Title</label>
                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
                  />
                </div>
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
                  placeholder="Brief description of the holiday"
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className={`px-4 py-2 text-white rounded-md ${theme.primary}`}
                >
                  Add Holiday
                </button>
              </div>
            </form>

            {/* ✅ Holiday List */}
            <h2 className="mb-4 text-xl font-semibold text-gray-800">Holiday List</h2>
            {holidays.length === 0 ? (
              <p className="text-center text-gray-500">No holidays added yet.</p>
            ) : (
              <div className="overflow-hidden border border-gray-200 rounded-lg">
                <div className="grid grid-cols-10 p-3 text-sm font-medium text-gray-700 bg-gray-100 border-b">
                  <div className="col-span-3">Title</div>
                  <div className="col-span-2">Date</div>
                  <div className="col-span-4">Description</div>
                  <div className="col-span-1 text-center">Action</div>
                </div>
                {holidays.map((holiday) => (
                  <div key={holiday._id} className="grid items-center grid-cols-10 p-3 text-sm border-t hover:bg-gray-50">
                    <div className="col-span-3 font-medium">{holiday.title}</div>
                    <div className="col-span-2 text-gray-600">{holiday.date.slice(0, 10)}</div>
                    <div className="col-span-4 text-gray-600">{holiday.description}</div>
                    <div className="col-span-1 text-center">
                      <button
                        onClick={() => handleDelete(holiday._id)}
                        className={`px-3 py-1 text-xs text-white rounded ${theme.danger}`}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* ✅ Sticky Footer */}
      <footer className="w-full mt-auto bg-white border-t border-gray-300">
        <Footer />
      </footer>
    </div>
  );
};

export default AddHolidays;
