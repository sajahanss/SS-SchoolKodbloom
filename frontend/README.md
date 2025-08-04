// School Management System - Full Folder Structure and Code (Frontend + Backend)

// 📁 Root Folder
school-management-system/
  ├── backend/                      Express + MongoDB Backend
│   ├── config/
│   │   └── db.js               // MongoDB connection setup
│   ├── controllers/
│   │   ├── authController.js  // Login logic for student, teacher, admin
│   │   └── studentController.js // Student operations (optional)
│   ├── middleware/
│   │   └── authMiddleware.js  // JWT role-based protection
│   ├── models/
│   │   ├── Student.js
│   │   ├── Teacher.js
│   │   ├── Admin.js
│   │   ├── Assignment.js
│   │   ├── Attendance.js
│   │   ├── Fee.js
│   │   └── Holiday.js
│   ├── routes/
│   │   ├── authRoutes.js      // Login endpoints
│   │   ├── studentRoutes.js
│   │   ├── teacherRoutes.js
│   │   └── adminRoutes.js
│   ├── .env                   // JWT_SECRET, DB URI
│   ├── server.js              // Entry point
│   └── package.json

├── frontend/                   # React Frontend
│   ├── public/
│   └── src/
│       ├── App.jsx
│       ├── index.js
│       ├── routes/ProtectedRoute.jsx // Role-based component
│       ├── components/
│       │   ├── Header.jsx
│       │   ├── Footer.jsx
│       │   └── Sidebar.jsx
│       ├── Pages/
│       │   ├── Home.jsx
│       │   ├── About.jsx
│       │   └── Contact.jsx
│       ├── Login/
│       │   ├── AdminLogin.jsx
│       │   ├── StudentLogin.jsx
│       │   └── TeacherLogin.jsx
│       ├── Dashboard/
│       │   ├── AdminDashboard.jsx
│       │   ├── StudentDashboard.jsx
│       │   └── TeacherDashboard.jsx
│       ├── Admin/
│       │   ├── ManageStudents.jsx
│       │   ├── ManageTeachers.jsx
│       │   ├── ManageCourses.jsx
│       │   ├── AddHolidaysList.jsx
│       │   ├── Announcements.jsx
│       │   └── Settings.jsx
│       ├── Student/
│       │   ├── Assignment.jsx
│       │   ├── Attendance.jsx
│       │   ├── Result.jsx
│       │   ├── FeePayment.jsx
│       │   └── HolidaysList.jsx
│       ├── Teacher/
│       │   ├── AddResults.jsx
│       │   ├── AddTask.jsx
│       │   ├── ManageAttendance.jsx
│       │   └── ViewStudents.jsx
│       └── services/api.js     // Axios instance
│
└── README.md


 
