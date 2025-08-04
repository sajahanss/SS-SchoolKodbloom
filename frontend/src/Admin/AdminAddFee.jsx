import React, { useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AdminAddFee = () => {
  const [form, setForm] = useState({
    name: "",
    rollno: "",
    className: "",
    section: "",
    amount: "",
  });

  const [paymentHistory, setPaymentHistory] = useState([]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const fetchPaymentHistory = async (roll) => {
    try {
      const res = await axios.get(
        `https://ss-schoolkodbloom.onrender.com/api/payments/by-rollno/${roll}`
      );
      setPaymentHistory(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch payment history", err);
    }
  };

  const handleBlurRoll = (e) => {
    const roll = e.target.value.trim();
    if (roll) fetchPaymentHistory(roll);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://ss-schoolkodbloom.onrender.com/api/payments/add-by-rollno", form);
      alert("✅ Fee recorded successfully!");
      fetchPaymentHistory(form.rollno); // refresh history
      setForm({ name: "", rollno: "", className: "", section: "", amount: "" });
    } catch (err) {
      alert(err.response?.data?.message || "❌ Error recording fee");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-1 p-6">
        <div className="max-w-3xl p-6 mx-auto bg-white shadow-md rounded-xl">
          <h2 className="mb-6 text-2xl font-bold text-blue-700">🧾 Add Student Fee</h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              { name: "name", label: "Student Name" },
              { name: "rollno", label: "Roll Number", onBlur: handleBlurRoll },
              { name: "className", label: "Class" },
              { name: "section", label: "Section" },
              { name: "amount", label: "Amount", type: "number" },
            ].map(({ name, label, type = "text", onBlur }) => (
              <div key={name}>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  {label}
                </label>
                <input
                  name={name}
                  type={type}
                  value={form[name]}
                  onChange={handleChange}
                  onBlur={onBlur}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-900 focus:border-blue-900"
                />
              </div>
            ))}

            <div className="mt-4 text-right md:col-span-2">
              <button
                type="submit"
                className="px-6 py-2 text-white bg-blue-900 rounded-md hover:bg-blue-900"
              >
                💾 Save Payment
              </button>
            </div>
          </form>

          {/* ✅ Payment History */}
          {paymentHistory.length > 0 && (
            <div className="mt-10">
              <h3 className="mb-2 text-lg font-semibold text-gray-700">📋 Payment History</h3>
              <table className="min-w-full overflow-hidden text-sm bg-white border border-gray-200 rounded-lg">
                <thead className="bg-blue-100">
                  <tr>
                    {["Name", "Roll No", "Class", "Section", "Amount", "Paid On"].map((h) => (
                      <th key={h} className="px-3 py-2 border">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paymentHistory.map((pay) => (
                    <tr key={pay._id} className="text-center border-t">
                      <td className="px-3 py-1">{pay.name}</td>
                      <td className="px-3 py-1">{pay.rollno}</td>
                      <td className="px-3 py-1">{pay.className}</td>
                      <td className="px-3 py-1">{pay.section}</td>
                      <td className="px-3 py-1">₹{pay.amount}</td>
                      <td className="px-3 py-1">
                        {new Date(pay.paymentDate || pay.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminAddFee;
