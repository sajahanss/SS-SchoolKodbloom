// routes/paymentRoutes.js
const express = require("express");
const router = express.Router();
const {
  addPaymentByRollno,
  getPaymentsByStudentId,
  getPaymentsByRollno, // ✅ ADD this
} = require("../controllers/paymentController");

router.post("/add-by-rollno", addPaymentByRollno);       // ✅ Admin adds payment
router.get("/student/:studentId", getPaymentsByStudentId); // ✅ Student sees payments
router.get("/by-rollno/:rollno", getPaymentsByRollno);   // ✅ Admin fetch by rollno

module.exports = router;
