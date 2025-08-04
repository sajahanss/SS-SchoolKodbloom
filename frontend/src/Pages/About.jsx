import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const featureCards = [
  {
    title: "📊 Dashboard",
    description: "Personalized views for Students, Teachers, and Admins",
    bg: "bg-blue-50",
    border: "border-l-blue-500",
  },
  {
    title: "📝 Digital Tools",
    description: "Attendance, Assignments, and Grade Tracking",
    bg: "bg-blue-50",
    border: "border-l-blue-500",
  },
  {
    title: "💬 Communication",
    description: "Instant Messaging & Announcements",
    bg: "bg-blue-50",
    border: "border-l-blue-500",
  },
  {
    title: "🔐 Security",
    description: "Secure Login with Role-based Access",
    bg: "bg-blue-50",
    border: "border-l-blue-500",
  },
];

const teamMembers = [
  { name: "John Doe", role: "Founder", color: "bg-blue-500" },
  { name: "Jane Smith", role: "Developer", color: "bg-blue-600" },
  { name: "Mike Johnson", role: "Designer", color: "bg-blue-400" },
  { name: "Sarah Williams", role: "Educator", color: "bg-blue-700" },
];

function About() {
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const backgroundColors = [
    "bg-blue-50",
    "bg-blue-100",
    "bg-blue-50",
    "bg-blue-100",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentColorIndex(
        (prevIndex) => (prevIndex + 1) % backgroundColors.length
      );
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`min-h-screen w-full ${backgroundColors[currentColorIndex]} transition-colors duration-1000`}>
      <Header />

      <main className="max-w-6xl px-5 pt-10 pb-10 mx-auto origin-top transform scale-100">
        {/* Title */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-extrabold text-transparent md:text-5xl bg-clip-text bg-gradient-to-r from-blue-800 to-blue-800">
            🌟 About Our School Management System
          </h1>
          <p className="max-w-4xl mx-auto text-lg text-gray-700">
            Welcome to{" "}
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-blue-800">
              ABC Public School
            </span>{" "}
            — where innovation meets education in a dynamic learning environment.
          </p>
        </div>

        {/* Vision and Mission */}
        <div className="grid gap-6 mb-12 md:grid-cols-2">
          <div className="p-6 bg-blue-50 border-l-4 border-blue-800 shadow-lg rounded-xl hover:scale-[1.02] transition-all">
            <h2 className="mb-2 text-2xl font-bold text-blue-800">🎯 Our Vision</h2>
            <p className="text-gray-700">
              To revolutionize education through technology that empowers students, supports educators, and connects communities for a brighter future.
            </p>
          </div>
          <div className="p-6 bg-blue-50 border-l-4 border-blue-800 shadow-lg rounded-xl hover:scale-[1.02] transition-all">
            <h2 className="mb-2 text-2xl font-bold text-blue-800">🚀 Our Mission</h2>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start"><span className="mr-2">✔️</span>Create intuitive educational tools</li>
              <li className="flex items-start"><span className="mr-2">✔️</span>Foster collaboration and transparency</li>
              <li className="flex items-start"><span className="mr-2">✔️</span>Streamline administrative processes</li>
              <li className="flex items-start"><span className="mr-2">✔️</span>Enhance communication channels</li>
            </ul>
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-12">
          <h2 className="mb-8 text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-blue-800">
            ✨ Key Features
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featureCards.map((card, index) => (
              <div key={index} className={`p-5 rounded-xl border-l-4 ${card.border} ${card.bg} shadow-md hover:scale-105 transition-all`}>
                <h3 className="mb-2 text-xl font-bold text-blue-800">{card.title}</h3>
                <p className="text-sm text-gray-700">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
{/* Meet the Team */}
<div className="p-6 mb-12 shadow-lg bg-blue-50 rounded-xl">
  <h2 className="mb-8 text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-500">
    👥 Meet Our Team
  </h2>
  <div className="flex flex-wrap justify-center gap-6">
    {teamMembers.map((member, index) => (
      <div key={index} className="w-40 p-4 text-white transition bg-blue-400 rounded-lg shadow-md hover:scale-105 hover:bg-blue-500">
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-3 bg-white rounded-full bg-opacity-30">
          <span className="text-2xl">👤</span>
        </div>
        <h3 className="font-bold text-center">{member.name}</h3>
        <p className="text-sm text-center text-white text-opacity-90">{member.role}</p>
      </div>
    ))}
  </div>
</div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 gap-4 mb-12 md:grid-cols-4">
          {[
            { value: "500+", label: "Students", color: "text-blue-600" },
            { value: "50+", label: "Teachers", color: "text-blue-600" },
            { value: "10+", label: "Years", color: "text-blue-600" },
            { value: "99%", label: "Satisfaction", color: "text-blue-600" },
          ].map((stat, index) => (
            <div key={index} className="p-4 transition-all bg-white shadow-md rounded-xl hover:scale-105">
              <div className={`text-3xl font-bold text-center mb-1 ${stat.color}`}>{stat.value}</div>
              <div className="text-sm font-medium text-center text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="p-8 text-center shadow-xl rounded-xl bg-gradient-to-r from-blue-800 to-blue-800">
          <h3 className="mb-4 text-2xl font-bold text-white">Ready to transform your school's management system?</h3>
          <p className="mb-6 text-blue-100">Join hundreds of schools already benefiting from our platform.</p>
          <button className="px-8 py-3 font-bold text-blue-800 transition-all bg-white rounded-full shadow-md hover:scale-105 hover:shadow-xl active:scale-95">
            Get Started Today
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default About;