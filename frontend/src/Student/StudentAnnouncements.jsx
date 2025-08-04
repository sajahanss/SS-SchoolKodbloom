import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaBullhorn } from 'react-icons/fa';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get('https://ss-schoolkodbloom.onrender.com/api/announcements')
      .then((res) => {
        setAnnouncements(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching announcements:', err);
        setError('Failed to fetch announcements.');
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* ✅ Header */}
      <header className="bg-white shadow">
        <Header />
      </header>

      {/* ✅ Main Content */}
      <main className="flex-1 p-4 bg-gray-50">
        <div className="max-w-6xl mx-auto overflow-hidden bg-white shadow-md rounded-xl">
          {/* Section Header */}
          <div className="flex items-center justify-between p-4 text-white bg-blue-900 rounded-t-xl">
            <div className="flex items-center gap-3">
              <FaBullhorn className="text-2xl" />
              <h1 className="text-2xl font-bold">Latest Announcements</h1>
            </div>
            <p className="text-sm opacity-80">Stay updated with recent updates</p>
          </div>

          {/* Announcement Content */}
          <div className="p-6 space-y-6 border border-indigo-200 bg-indigo-50 rounded-b-xl">
            {loading && <p className="text-gray-600">⏳ Loading announcements...</p>}
            {error && <p className="font-semibold text-red-600">{error}</p>}
            {!loading && announcements.length === 0 && (
              <p className="text-gray-600">📭 No announcements available.</p>
            )}

            {/* Announcement Cards */}
            <ul className="grid gap-5 md:grid-cols-2">
              {announcements.map((a) => (
                <li
                  key={a._id}
                  className="p-5 transition duration-200 transform border border-yellow-200 shadow bg-yellow-50 rounded-xl hover:scale-105 hover:shadow-lg"
                >
                  <h3 className="mb-2 text-xl font-semibold text-yellow-800">{a.title}</h3>
                  <p className="text-gray-800">{a.message}</p>
                  <p className="mt-2 text-sm text-gray-600">
                    🕒{' '}
                    {a.createdAt
                      ? new Date(a.createdAt).toLocaleString('en-IN', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: true,
                        })
                      : 'Date not available'}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>

      {/* ✅ Footer */}
      <footer className="bg-white border-t">
        <Footer />
      </footer>
    </div>
  );
};

export default Announcements;
