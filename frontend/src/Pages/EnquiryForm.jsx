import React, { useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

const EnquiryForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    services: [], // For checkboxes
    preferredContact: "" // For radio buttons
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dynamic background colors
  const bgColors = ["bg-gradient-to-r from-blue-50 to-indigo-50", "bg-gradient-to-r from-amber-50 to-orange-50"];
  const [currentBg, setCurrentBg] = useState(bgColors[0]);

  // Services options for checkboxes
  const serviceOptions = [
    { id: "web", label: "Web Development" },
    { id: "mobile", label: "Mobile App Development" },
    { id: "design", label: "UI/UX Design" },
    { id: "consulting", label: "IT Consulting" }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === "checkbox") {
      setFormData(prev => ({
        ...prev,
        services: checked 
          ? [...prev.services, value]
          : prev.services.filter(service => service !== value)
      }));
    } else {
      setFormData({...formData, [name]: value});
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await axios.post("http://localhost:5000/api/enquiry", formData);
      setSuccess("Enquiry submitted successfully!");
      setError("");
      setFormData({ 
        name: "", 
        email: "", 
        phone: "", 
        message: "",
        services: [],
        preferredContact: ""
      });
      // Rotate background color on success
      setCurrentBg(bgColors[Math.floor(Math.random() * bgColors.length)]);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit enquiry.");
      setSuccess("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <div className={`min-h-screen py-12 ${currentBg} transition-colors duration-500`}>
        <div className="max-w-2xl p-8 mx-auto bg-white shadow-lg rounded-xl">
          <h2 className="mb-8 text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            Enquiry Form
          </h2>
          
          {success && (
            <div className="p-4 mb-6 text-green-800 bg-green-100 rounded-lg">
              {success}
            </div>
          )}
          
          {error && (
            <div className="p-4 mb-6 text-red-800 bg-red-100 rounded-lg">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Services Interested In
              </label>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {serviceOptions.map((service) => (
                  <div key={service.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={service.id}
                      name="services"
                      value={service.id}
                      checked={formData.services.includes(service.id)}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor={service.id} className="ml-2 text-sm text-gray-700">
                      {service.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Preferred Contact Method
              </label>
              <div className="flex space-x-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="email-contact"
                    name="preferredContact"
                    value="email"
                    checked={formData.preferredContact === "email"}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <label htmlFor="email-contact" className="ml-2 text-sm text-gray-700">
                    Email
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="phone-contact"
                    name="preferredContact"
                    value="phone"
                    checked={formData.preferredContact === "phone"}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <label htmlFor="phone-contact" className="ml-2 text-sm text-gray-700">
                    Phone
                  </label>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Your Message *
              </label>
              <textarea
                name="message"
                rows="5"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-20 py-2 px-4 text-white font-medium rounded-lg transition-all duration-300 ${
                isSubmitting 
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EnquiryForm;