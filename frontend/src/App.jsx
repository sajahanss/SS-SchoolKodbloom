import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Public Pages
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import EnquiryForm from "./Pages/EnquiryForm";
import Department from "./Pages/Department";

// Logins / Signup
import SelectRole from "./Login/SelectRole";
import StudentLogin from "./Login/StudentLogin";
import TeacherLogin from "./Login/TeacherLogin";
import AdminLogin from "./Login/AdminLogin";
import AdminSignup from "./Signup/AdminSignup";

// Dashboards
import StudentDashboard from "./Dashboard/StudentDashboard";
import TeacherDashboard from "./Dashboard/TeacherDashboard";
import AdminDashboard from "./Dashboard/AdminDashboard";

// Admin Pages
import AdminOverview from "./Admin/AdminOverview";
import AddHolidays from "./Admin/AddHolidays";
import Announcements from "./Admin/Announcements";
import ManageSubjects from "./Admin/ManageSubjects";
import ManageStudents from "./Admin/ManageStudents";
import ManageTeachers from "./Admin/ManageTeachers";
import AddTimeTable from "./Admin/AddTimeTable";
import AdminAddFee from "./Admin/AdminAddFee";

// Student Pages
import StudentAnnouncements from "./Student/StudentAnnouncements";
import FeeStatus from "./Student/FeeStatus";
import StudentAssignments from "./Student/StudentAssignments";
import StudentAttendance from "./Student/StudentAttendance";
import Holidays from "./Student/Holidays";
import Results from "./Student/Results";
import StudentSubjects from "./Student/StudentSubjects";
import ViewTimeTable from "./Student/ViewTimeTable";

// Teacher Pages
import TeacherOverview from "./Teacher/TeacherOverview"; // ✅ Required inside layout
import TeacherAnnouncements from "./Teacher/TeacherAnnouncements";
import AddAssignments from "./Teacher/AddAssignments";
import AddAttendance from "./Teacher/AddAttendance";
import MySubjects from "./Teacher/MySubjects";
import StudentTimeTable from "./Teacher/StudentTimeTable";
import TeacherHolidays from "./Teacher/TeacherHolidays";
import AddResults from "./Teacher/AddResults";
import StudentLeaveRequest from "./Student/StudentLeaveRequest";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/enquiry" element={<EnquiryForm />} />
         <Route path="/department" element={<Department />} />


        {/* Logins / Signup */}
        <Route path="/select-role" element={<SelectRole />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/teacher-login" element={<TeacherLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-signup" element={<AdminSignup />} />

        {/* ✅ Admin layout: only overview nested */}
        <Route path="/admin-dashboard" element={<AdminDashboard />}>
          <Route index element={<AdminOverview />} />
        </Route>
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/manage-subjects" element={<ManageSubjects />} />
        <Route path="/manage-students" element={<ManageStudents />} />
        <Route path="/manage-teachers" element={<ManageTeachers />} />
        <Route path="/add-holidays" element={<AddHolidays />} />
        <Route path="/timetable" element={<AddTimeTable />} />
        <Route path="/fee-payment" element={<AdminAddFee />} />

        {/* ✅ Teacher layout: only overview nested */}
        <Route path="/teacher-dashboard" element={<TeacherDashboard />}>
          <Route index element={<TeacherOverview />} />
        </Route>
        {/* ❌ All other teacher pages are standalone */}
        <Route path="/teacher-announcements" element={<TeacherAnnouncements />} />
        <Route path="/teacher-assignments" element={<AddAssignments />} />
        <Route path="/teacher-attendance" element={<AddAttendance />} />
        <Route path="/add-results" element={<AddResults />} />
        <Route path="/teacher-subjects" element={<MySubjects />} />
        <Route path="/teacher-timetable" element={<StudentTimeTable />} />
        <Route path="/teacher-holidays" element={<TeacherHolidays />} />
        

        {/* Student Pages */}
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/student-announcements" element={<StudentAnnouncements />} />
        <Route path="/fee-status" element={<FeeStatus />} />
        <Route path="/student-assignments" element={<StudentAssignments />} />
        <Route path="/student-attendence" element={<StudentAttendance />} />
        <Route path="/holidays" element={<Holidays />} />
        <Route path="/results" element={<Results />} />
        <Route path="/student-subjects" element={<StudentSubjects />} />
        <Route path="/time-table" element={<ViewTimeTable />} />
        <Route path="/leaverequest" element={<StudentLeaveRequest />} /> {/* ✅ Leave Request page */}  

        {/* 404 */}
        <Route
          path="*"
          element={
            <div className="p-10 text-center text-red-500">404 - Page Not Found</div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
