// models/Payment.js
const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  amount: { type: Number, required: true },
  paymentDate: { type: Date, default: Date.now },
  recordedBy: { type: String, default: "Admin" },
});

module.exports = mongoose.model("Payment", paymentSchema);
