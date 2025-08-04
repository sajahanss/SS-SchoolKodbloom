// FeeStatus.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

const FeeStatus = () => {
  const [payments, setPayments] = useState([]);
  const studentId = localStorage.getItem("studentId");
  const studentName = localStorage.getItem("studentName");
  const rollno = localStorage.getItem("studentRollNo");
  const className = localStorage.getItem("studentClass");
  const section = localStorage.getItem("studentSection");

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/payments/student/${studentId}`);
        setPayments(res.data);
      } catch (err) {
        alert("❌ Unable to load payments.");
      }
    };

    if (studentId) fetchPayments();
  }, [studentId]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />

      <main className="flex-1 p-6">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-blue-800 mb-2">💰 My Fee Status</h1>
          <p className="text-gray-500 mb-4">Here’s your latest payment summary:</p>

          <div className="mb-4">
            <p><strong>Name:</strong> {studentName}</p>
            <p><strong>Roll No:</strong> {rollno}</p>
            <p><strong>Class:</strong> {className} - {section}</p>
          </div>

          {payments.length === 0 ? (
            <div className="bg-yellow-100 text-yellow-800 p-4 rounded-md text-center">
              ⚠️ No payment records found.
            </div>
          ) : (
            <table className="w-full border mt-4 text-sm text-gray-700">
              <thead className="bg-blue-100 text-blue-700">
                <tr>
                  <th className="px-4 py-2 border">Amount</th>
                  <th className="px-4 py-2 border">Date</th>
                  <th className="px-4 py-2 border">Recorded By</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p) => (
                  <tr key={p._id} className="text-center hover:bg-gray-50">
                    <td className="px-4 py-2 border">₹{p.amount}</td>
                    <td className="px-4 py-2 border">{new Date(p.paymentDate).toLocaleDateString()}</td>
                    <td className="px-4 py-2 border">{p.recordedBy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FeeStatus;
