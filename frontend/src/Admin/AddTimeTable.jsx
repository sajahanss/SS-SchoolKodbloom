import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';
import { FiUpload, FiFile, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
import Header from '../components/Header';   // ✅ Added
import Footer from '../components/Footer';   // ✅ Added

function UploadTimeTable() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setMessage({ text: '', type: '' });
    }
  };

  const showMessage = (text, type = 'error') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 5000);
  };

  const validateFile = (jsonData) => {
    const requiredFields = ['className', 'section', 'day', 'period', 'subject', 'teacherName'];
    
    if (!jsonData.length) {
      showMessage('The file is empty or format is invalid.');
      return false;
    }

    const hasAllFields = requiredFields.every(field => 
      Object.keys(jsonData[0]).includes(field)
    );

    if (!hasAllFields) {
      showMessage(`Invalid format. Required columns: ${requiredFields.join(', ')}`);
      return false;
    }

    return true;
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      showMessage('Please select a file first');
      return;
    }

    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        setLoading(true);
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);

        if (!validateFile(jsonData)) {
          setLoading(false);
          return;
        }

        const res = await axios.post(
          'http://localhost:5000/api/timetable/bulk-upload', 
          { timetable: jsonData }
        );

        showMessage(res.data.message || 'Timetable uploaded successfully!', 'success');
        setSelectedFile(null);
      } catch (err) {
        console.error('Upload Error:', err);
        showMessage(err.response?.data?.message || 'Failed to upload timetable');
      } finally {
        setLoading(false);
      }
    };

    reader.onerror = () => {
      showMessage('Failed to read file');
      setLoading(false);
    };

    reader.readAsArrayBuffer(selectedFile);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* ✅ Global Header */}
      <Header />

      {/* ✅ Page Content */}
      <main className="flex-1 p-4 md:p-8">
        <div className="max-w-2xl p-6 mx-auto bg-white shadow-md rounded-xl">
          <div className="flex items-center mb-6 space-x-3">
            <FiUpload className="text-2xl text-blue-900" />
            <h2 className="text-2xl font-bold text-gray-800">Upload Timetable</h2>
          </div>

          <div className="space-y-6">
            {/* File Upload Section */}
            <div className="p-4 border-2 border-gray-300 border-dashed rounded-lg">
              <label className="flex flex-col items-center space-y-2 cursor-pointer">
                <FiFile className="text-3xl text-gray-400" />
                <span className="text-sm font-medium text-gray-600">
                  {selectedFile ? selectedFile.name : 'Select Excel file (.xlsx, .csv)'}
                </span>
                <input
                  type="file"
                  accept=".xlsx, .xls, .csv"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Message Display */}
            {message.text && (
              <div className={`p-3 rounded-lg flex items-center ${
                message.type === 'success' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {message.type === 'success' ? (
                  <FiCheckCircle className="mr-2" />
                ) : (
                  <FiAlertCircle className="mr-2" />
                )}
                <span>{message.text}</span>
              </div>
            )}

            {/* Upload Button */}
            <button
              onClick={handleUpload}
              disabled={loading || !selectedFile}
              className={`w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center ${
                loading 
                  ? 'bg-gray-300 cursor-not-allowed' 
                  : 'bg-blue-900 hover:bg-blue-900 text-white'
              }`}
            >
              {loading ? (
                <>
                  <svg className="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <FiUpload className="mr-2" />
                  Upload Timetable
                </>
              )}
            </button>

            {/* Help Text */}
            <div className="p-3 text-sm text-blue-900 rounded-lg bg-blue-50">
              <p className="font-medium">File Requirements:</p>
              <ul className="pl-5 mt-1 space-y-1 list-disc">
                <li>Excel (.xlsx, .xls) or CSV format</li>
                <li>Required columns: className, section, day, period, subject, teacherName</li>
                <li>First row should contain column headers</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* ✅ Sticky Footer */}
      <footer className="w-full mt-auto bg-white border-t border-gray-300">
        <Footer />
      </footer>
    </div>
  );
}

export default UploadTimeTable;
