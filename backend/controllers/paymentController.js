// controllers/paymentController.js
const Payment = require("../models/Payment");
const Student = require("../models/Student");

// ✅ Admin pays for a student using rollno + class
exports.addPaymentByRollno = async (req, res) => {
  const { rollno, className, section, name, amount } = req.body;

  try {
    const student = await Student.findOne({ rollno, className, section });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const payment = new Payment({
      student: student._id,
      name,
      rollno,
      className,
      section,
      amount,
      recordedBy: "Admin",
    });

    await payment.save();
    res.status(201).json({ message: "Payment recorded", payment });
  } catch (err) {
    console.error("Error in payment:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Student views their own payments
exports.getPaymentsByStudentId = async (req, res) => {
  const studentId = req.params.studentId;

  try {
    const payments = await Payment.find({ student: studentId }).sort({ paymentDate: -1 });
    res.json(payments);
  } catch (err) {
    console.error("Get Payments by Student ID Error:", err);
    res.status(500).json({ message: "Failed to get payments" });
  }
};

// ✅ Admin views payments by student roll number
exports.getPaymentsByRollno = async (req, res) => {
  const { rollno } = req.params;

  try {
    const payments = await Payment.find({ rollno }).sort({ paymentDate: -1 });
    res.json(payments);
  } catch (err) {
    console.error("Get Payments by Roll No Error:", err);
    res.status(500).json({ message: "Failed to fetch payment data" });
  }
};
