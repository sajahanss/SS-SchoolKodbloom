import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Contact() {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  // Blue color palette
  const colors = {
    primary: "#3B82F6",  // blue-500
    light: "#93C5FD",    // blue-300
    lighter: "#DBEAFE",  // blue-100
    dark: "#1D4ED8",     // blue-700
    text: "#FFFFFF",
    gradient: "linear-gradient(135deg, #3B82F6, #1D4ED8)"
  };

  const contactItems = [
    {
      id: 1,
      title: "🏢 Office Address",
      content: (
        <>
          Kodebloom Technologies<br />
          No. 55, Plot No. 108, NYN Arcade,<br />
          3rd Floor, Gachibowli,<br />
          Hyderabad – 500032
        </>
      ),
      icon: "📍",
    },
    {
      id: 2,
      title: "📞 Phone",
      content: (
        <>
          +91‑9063097733<br />
          <span className="text-sm text-blue-600">(Mon–Sat, 9 AM–4 PM)</span>
        </>
      ),
      icon: "📱",
    },
    {
      id: 3,
      title: "✉️ Email",
      content: (
        <a
          href="mailto:info@kodebloom.com"
          className="font-medium text-blue-700 hover:underline"
        >
          info@kodebloom.com
        </a>
      ),
      icon: "💌",
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  return (
    <div className="w-full min-h-screen bg-blue-50">
      <Header />

      <main className="px-4 pt-8 pb-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-blue-100 to-transparent opacity-40"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
        </div>

        {/* Heading */}
        <div className="relative mb-12 text-center">
          <div className="absolute inset-x-0 top-1/2 h-1/2 bg-blue-100/50 -z-10"></div>
          <h1 className="relative inline-block px-6 py-3 mb-4 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
            Contact Us
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-blue-900/80">
            Reach out to{" "}
            <span className="font-semibold text-blue-800">
              Kodebloom Technologies
            </span>{" "}
            — we're happy to help with any questions you may have.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid gap-6 mb-16 md:grid-cols-3">
          {contactItems.map((item) => (
            <div
              key={item.id}
              className={`relative p-6 rounded-xl transition-all duration-300 overflow-hidden group ${
                hoveredItem === item.id
                  ? "transform scale-105 shadow-lg"
                  : "shadow-md"
              }`}
              style={{
                backgroundColor: hoveredItem === item.id ? colors.lighter : "white",
                border: `1px solid ${colors.light}`
              }}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-600"></div>
              <div className="flex items-start mb-4">
                <span className="mr-4 text-3xl text-blue-500">{item.icon}</span>
                <h2 className="text-xl font-bold text-blue-800">{item.title}</h2>
              </div>
              <div className="pl-12 text-blue-700">{item.content}</div>
              <div className="absolute bottom-0 right-0 p-2 text-blue-300 transition-colors group-hover:text-blue-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Map and Form Section */}
        <div className="grid gap-8 mb-12 lg:grid-cols-2">
          {/* Google Map */}
          <div className="overflow-hidden bg-white border border-blue-200 shadow-lg rounded-xl h-96 lg:h-full">
            <iframe
              title="Kodebloom Technologies Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.406759186884!2d78.48668227507308!3d17.43992918341851!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb973073982931%3A0xa60a158bbbb38392!2sKodebloom%20Technologies!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* Message Form */}
          <div className="p-8 bg-white border border-blue-200 shadow-lg rounded-xl">
            <h2 className="mb-6 text-2xl font-bold text-center text-blue-800">
              📝 Send Us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="block mb-2 font-medium text-blue-700">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 font-medium text-blue-700">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block mb-2 font-medium text-blue-700">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 font-medium text-blue-700">Message</label>
                <textarea
                  rows="4"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 font-medium text-white transition-all duration-300 bg-blue-900 rounded-lg hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="p-8 text-center bg-white border border-blue-200 shadow-lg rounded-xl">
          <div className="inline-flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <h3 className="mb-2 text-xl font-bold text-blue-800">Prefer to talk directly?</h3>
          <p className="mb-4 text-blue-700">Our team is available Monday to Friday, 9AM to 5PM</p>
          <a 
            href="tel:+919063097733" 
            className="inline-flex items-center px-6 py-3 text-lg font-medium text-white transition-all duration-300 bg-blue-900 rounded-lg hover:bg-blue-700 hover:shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Call +91 9063097733
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Contact;