import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// 📌 NoticeCard
const NoticeCard = ({ image, title, author }) => (
  <div className="flex items-center gap-3 p-3 mb-3 bg-white rounded-lg shadow-sm">
    <img src={image} alt="Notice" className="object-cover w-12 h-12 rounded" />
    <div>
      <h3 className="text-sm font-bold">{title}</h3>
      <p className="text-xs text-gray-500">By - {author}</p>
    </div>
  </div>
);

const AdminOverview = () => {
  const admin = JSON.parse(localStorage.getItem("admin")) || {};
  const navigate = useNavigate();

  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [lastLogin, setLastLogin] = useState("");
  const [studentCount, setStudentCount] = useState(null);
  const [teacherCount, setTeacherCount] = useState(null);
  const [subjectCount, setSubjectCount] = useState(null);
  const [sortBy, setSortBy] = useState("Yearly");
// add new things
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };
// added
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    const loginTime = new Date();
    loginTime.setHours(loginTime.getHours() - 2);
    setLastLogin(loginTime.toLocaleString());

    const fetchData = async () => {
      try {
        const [studentsRes, teachersRes, subjectsRes] = await Promise.all([
          axios.get("https://ss-schoolkodbloom.onrender.com/api/students/count"),
          axios.get("https://ss-schoolkodbloom.onrender.com/api/teachers/count"),
          axios.get("https://ss-schoolkodbloom.onrender.com/api/subjects/count"),
        ]);

        setStudentCount(studentsRes.data.count);
        setTeacherCount(teachersRes.data.count);
        setSubjectCount(subjectsRes.data.count);
      } catch (err) {
        console.error("Failed to fetch data", err);
      }
    };

    fetchData();
    return () => clearInterval(timer);
  }, []);

  const chartData = sortBy === "Yearly"
    ? {
        labels: ["2017", "2018", "2019", "2020", "2021", "2022"],
        datasets: [
          {
            label: "Yearly Stats",
            data: [200, 600, 400, 550, 750, 500],
            backgroundColor: ["#a78bfa", "#818cf8", "#a78bfa", "#818cf8", "#a78bfa", "#818cf8"],
            borderRadius: 8,
          },
        ],
      }
    : {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Monthly Stats",
            data: [100, 400, 300, 500, 250, 700],
            backgroundColor: ["#818cf8", "#a78bfa", "#818cf8", "#a78bfa", "#818cf8", "#a78bfa"],
            borderRadius: 8,
          },
        ],
      };

  const chartOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      y: { beginAtZero: true, ticks: { stepSize: 200 }, max: 800 },
    },
  };

  const notices = [
    {
      id: 1,
      image: "https://via.placeholder.com/100",
      title: "Notice of Special Exams Spring 2021",
      author: "Justin Langer",
    },
    {
      id: 2,
      image: "https://via.placeholder.com/100",
      title: "Time Extension for Semester Admission",
      author: "Danial Vatory",
    },
    {
      id: 3,
      image: "https://via.placeholder.com/100",
      title: "COVID-19 Vaccination Survey",
      author: "Jacob Oram",
    },
    {
      id: 4,
      image: "https://via.placeholder.com/100",
      title: "Scholarship Viva Spring 2021",
      author: "Bhargav Raju",
    },
  ];

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-indigo-50 to-purple-100">
      <div className="mx-auto space-y-8 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
          <div>
            <h2 className="text-xl font-bold text-purple-700">Admin Dashboard</h2>
            <p className="text-sm text-gray-500">
              {getGreeting()}, <span className="font-semibold">{admin.name || "Admin"}</span>
            </p>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-sm">{new Date().toLocaleDateString()}</span>
            <span className="text-xs text-purple-500">{currentTime}</span>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="p-4 text-center bg-white rounded shadow">
            <h3 className="text-lg font-semibold text-indigo-600">Students</h3>
            <p className="text-2xl font-bold">{studentCount ?? "..."}</p>
          </div>
          <div className="p-4 text-center bg-white rounded shadow">
            <h3 className="text-lg font-semibold text-purple-600">Teachers</h3>
            <p className="text-2xl font-bold">{teacherCount ?? "..."}</p>
          </div>
          <div className="p-4 text-center bg-white rounded shadow">
            <h3 className="text-lg font-semibold text-emerald-600">Subjects</h3>
            <p className="text-2xl font-bold">{subjectCount ?? "..."}</p>
          </div>
        </div>

        {/* Chart & Notices */}
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="w-full p-4 bg-white rounded-lg shadow md:w-1/2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-700">Statistics</h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="p-1 text-sm border rounded"
              >
                <option value="Yearly">Yearly</option>
                <option value="Monthly">Monthly</option>
              </select>
            </div>
            <Bar data={chartData} options={chartOptions} />
          </div>

          <div className="w-full p-4 bg-white rounded-lg shadow md:w-1/2">
            <h3 className="mb-2 text-lg font-bold text-gray-700">Notice Board</h3>
            <div className="h-64 pr-2 overflow-y-auto">
              {notices.map((notice) => (
                <NoticeCard key={notice.id} {...notice} />
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h3 className="mb-4 text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {/* Add Student */}
            <button
              onClick={() => navigate("/manage-students")}
              className="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl hover:shadow-md hover:scale-[1.02] transition-all"
            >
              <div className="p-3 mb-2 bg-white rounded-full shadow-md">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <span className="text-sm font-bold text-blue-800">Add Student</span>
              <span className="text-xs text-blue-600">New record</span>
            </button>

            {/* Add Teacher */}
            <button
              onClick={() => navigate("/manage-teachers")}
              className="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl hover:shadow-md hover:scale-[1.02] transition-all"
            >
              <div className="p-3 mb-2 bg-white rounded-full shadow-md">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <span className="text-sm font-bold text-purple-800">Add Teacher</span>
              <span className="text-xs text-purple-600">New staff</span>
            </button>

            {/* Add Subject */}
            <button
              onClick={() => navigate("/manage-subjects")}
              className="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-teal-100 to-teal-200 rounded-xl hover:shadow-md hover:scale-[1.02] transition-all"
            >
              <div className="p-3 mb-2 bg-white rounded-full shadow-md">
                <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <span className="text-sm font-bold text-teal-800">Add Subject</span>
              <span className="text-xs text-teal-600">New course</span>
            </button>

            {/* Settings */}
            <button
              onClick={() => navigate("/admin/settings")}
              className="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl hover:shadow-md hover:scale-[1.02] transition-all"
            >
              <div className="p-3 mb-2 bg-white rounded-full shadow-md">
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-sm font-bold text-gray-700">Settings</span>
              <span className="text-xs text-gray-500">Preferences</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-xs text-center text-gray-500">
          © {new Date().getFullYear()} School Management System — Bhargav Raju
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
