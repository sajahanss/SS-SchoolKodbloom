// 📁 server.js

const fs = require('fs');
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Ensure folders exist
const uploadsDir = path.join(__dirname, 'uploads');
const profileDir = path.join(uploadsDir, 'profiles');
const submissionDir = path.join(uploadsDir, 'submissions');

[uploadsDir, profileDir, submissionDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`📁 Created folder: ${dir}`);
  }
});

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Serve static files (images, PDFs, etc.)
app.use('/uploads', express.static(uploadsDir));
app.use('/uploads/profiles', express.static(profileDir));
app.use('/uploads/submissions', express.static(submissionDir));

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ Import Routes
const adminRoutes         = require('./routes/adminRoutes');
const studentRoutes       = require('./routes/studentRoutes');
const teacherRoutes       = require('./routes/teacherRoutes');
const announcementRoutes  = require('./routes/announcementRoutes');
const holidayRoutes       = require('./routes/holidayRoutes');
const subjectRoutes       = require('./routes/subjectRoutes');
const assignmentRoutes    = require('./routes/assignmentRoutes');
const attendanceRoutes    = require('./routes/attendanceRoutes');
const timeTableRoutes     = require('./routes/timeTableRoutes');
const enquiryRoute        = require('./routes/enquiryRoute');
const paymentRoutes       = require('./routes/paymentRoutes');
const dashboardRoutes     = require('./routes/dashboardRoutes');
const submissionRoutes    = require('./routes/submissionRoutes');
const resultRoutes        = require('./routes/resultRoutes');
const leaveRequestRoutes = require("./routes/leaveRequests");

// ✅ Mount Routes (REST APIs)
app.use('/api/admins',        adminRoutes);
app.use('/api/students',      studentRoutes);
app.use('/api/teachers',      teacherRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/holidays',      holidayRoutes);
app.use('/api/subjects',      subjectRoutes);
app.use('/api/assignments',   assignmentRoutes);
app.use('/api/attendance',    attendanceRoutes);
app.use('/api/timetable',     timeTableRoutes);
app.use('/api/enquiry',       enquiryRoute);
app.use('/api/payments',      paymentRoutes);
app.use('/api',               dashboardRoutes);
app.use('/api/submissions',   submissionRoutes);
app.use('/api/results',       resultRoutes);
app.use("/api/leave-requests", leaveRequestRoutes);



// ✅ Health Check
app.get('/', (req, res) => {
  res.send('🚀 School Management System Backend is running...');
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
