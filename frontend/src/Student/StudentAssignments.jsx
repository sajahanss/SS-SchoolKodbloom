import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

const StudentAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [fileInputs, setFileInputs] = useState({});
  const [uploading, setUploading] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const studentId = localStorage.getItem('studentId');
  const studentName = localStorage.getItem('studentName');
  const studentRoll = localStorage.getItem('studentRollNo');
  const className = localStorage.getItem('studentClass');
  const section = localStorage.getItem('studentSection');

  // Fetch assignments and check submission status
  const fetchAssignments = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`https://ss-schoolkodbloom.onrender.com/api/assignments/${className}/${section}`);
      const data = await Promise.all(res.data.map(async (a) => {
        const r = await axios.get(`https://ss-schoolkodbloom.onrender.com/api/submissions/check/${a._id}/${studentId}`);
        return { ...a, submitted: r.data.submitted };
      }));
      setAssignments(data);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to load assignments.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (studentId && className && section) {
      fetchAssignments();
    } else {
      setError('⚠️ Missing student credentials. Please login again.');
      setLoading(false);
    }
  }, []);

  const handleFileChange = (e, id) => {
    setFileInputs({ ...fileInputs, [id]: e.target.files[0] });
  };

  const handleUpload = async (id) => {
    if (!fileInputs[id]) return alert('⚠️ Please select a file.');

    const formData = new FormData();
    formData.append('file', fileInputs[id]);
    formData.append('studentId', studentId);
    formData.append('studentName', studentName);
    formData.append('studentRoll', studentRoll);
    formData.append('className', className);
    formData.append('section', section);

    try {
      setUploading({ ...uploading, [id]: true });
      const res = await axios.post(
        `https://ss-schoolkodbloom.onrender.com/api/submissions/upload/${id}`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      alert(res.data.message || '✅ Upload successful');
      fetchAssignments();  // refresh assignment statuses
    } catch (err) {
      console.error(err);
      alert('❌ Upload failed');
    } finally {
      setUploading({ ...uploading, [id]: false });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow p-4">
        <div className="max-w-6xl mx-auto overflow-hidden bg-white shadow rounded-xl">
          <div className="p-4 text-white bg-blue-900 rounded-t-xl">
            <h1 className="text-2xl">Assignment Portal</h1>
            <p className="opacity-90">Submit your assignments here</p>
          </div>
          <div className="p-6">
            {error && <div className="p-3 mb-4 text-red-600 bg-red-100 rounded">{error}</div>}
            {loading ? (
              <div className="py-8 text-center">
                <div className="inline-block w-8 h-8 border-4 border-blue-900 rounded-full border-t-transparent animate-spin" />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3">Assignment</th>
                      <th className="px-6 py-3">Description</th>
                      <th className="px-6 py-3">Due Date</th>
                      <th className="px-6 py-3">Upload</th>
                      <th className="px-6 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {assignments.map(a => (
                      <tr key={a._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">{a.title}</td>
                        <td className="px-6 py-4">{a.description}</td>
                        <td className="px-6 py-4">
                          {new Date(a.dueDate).toLocaleDateString('en-IN', {
                            year: 'numeric', month: 'short', day: 'numeric'
                          })}
                        </td>
                        <td className="px-6 py-4">
                          {a.submitted ? (
                            <span className="font-semibold text-green-600">✅ Submitted</span>
                          ) : (
                            <>
                              <input
                                type="file"
                                onChange={(e) => handleFileChange(e, a._id)}
                                className="mb-1"
                              />
                              <button
                                onClick={() => handleUpload(a._id)}
                                className="px-3 py-1 text-white bg-blue-900 rounded hover:bg-blue-900"
                                disabled={uploading[a._id]}
                              >
                                {uploading[a._id] ? 'Uploading...' : 'Upload'}
                              </button>
                            </>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 font-semibold rounded-full ${a.submitted ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {a.submitted ? 'Submitted' : 'Pending'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StudentAssignments;
