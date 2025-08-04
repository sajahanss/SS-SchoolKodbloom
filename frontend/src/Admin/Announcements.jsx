import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

function AddAnnouncements() {
  const [announcements, setAnnouncements] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    message: "",
  });

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/announcements");
      setAnnouncements(res.data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch announcements");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/announcements/add", form);
      setAnnouncements([res.data, ...announcements]);
      setForm({ title: "", message: "" });
      setError(null);
      setSuccess("Announcement posted successfully!");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to post announcement");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this announcement?")) return;
    try {
      setLoading(true);
      await axios.delete(`http://localhost:5000/api/announcements/${id}`);
      setAnnouncements(announcements.filter((a) => a._id !== id));
      setSuccess("Announcement deleted successfully!");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error(err);
      setError("Failed to delete announcement");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-blue-50">
      <Header />

      <main className="flex-1 p-4 md:p-6">
        <div className="max-w-6xl mx-auto overflow-hidden bg-white shadow-lg rounded-xl">
          {/* Header */}
          <div className="p-6 text-white bg-blue-800 rounded-t-xl">
            <h1 className="text-2xl font-bold md:text-3xl">📢 Announcement Management</h1>
            <p className="mt-1 text-blue-200">Post and manage school-wide announcements</p>
          </div>

          {/* Content */}
          <div className="p-6 space-y-8">
            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="p-6 space-y-6 border border-gray-200 shadow-sm rounded-xl"
            >
              <h2 className="text-xl font-semibold text-gray-800">Create New Announcement</h2>

              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter announcement title"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows="5"
                    className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-blue-900"
                    placeholder="Write your announcement here..."
                    required
                  ></textarea>
                </div>
              </div>

              {error && (
                <div className="p-3 text-sm text-red-700 bg-red-100 border-l-4 border-red-500 rounded">
                  {error}
                </div>
              )}

              {success && (
                <div className="p-3 text-sm text-blue-900 bg-blue-100 border-l-4 border-blue-900 rounded">
                  {success}
                </div>
              )}

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-6 py-2 text-white rounded-lg shadow-md ${
                    loading
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-blue-900 hover:bg-blue-900 focus:ring-2 focus:ring-blue-900 focus:ring-offset-2"
                  } transition-colors duration-200`}
                >
                  {loading ? "Posting..." : "Post Announcement"}
                </button>
              </div>
            </form>

            {/* Announcement List */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-800">📜 All Announcements</h2>
                <div className="text-sm text-gray-500">
                  {announcements.length} announcement{announcements.length !== 1 ? "s" : ""}
                </div>
              </div>

              {announcements.length === 0 ? (
                <div className="p-6 text-center text-gray-500 bg-gray-100 rounded-lg">
                  No announcements posted yet.
                </div>
              ) : (
                announcements.map((a) => (
                  <div
                    key={a._id}
                    className="p-5 transition-shadow duration-200 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md"
                  >
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-blue-900">{a.title}</h3>
                        <p className="mt-2 text-gray-700 whitespace-pre-line">{a.message}</p>
                        <p className="mt-2 text-sm text-gray-500">
                          Posted on {new Date(a.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDelete(a._id)}
                        disabled={loading}
                        className="p-2 text-red-600 transition-colors duration-200 bg-red-100 rounded h-fit hover:bg-red-200"
                        aria-label="Delete announcement"
                      >
                        🗑
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default AddAnnouncements;