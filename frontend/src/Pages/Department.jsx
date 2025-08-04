import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Department() {
  const departments = [
    {
      name: "Science Department",
      description: "Offers Physics, Chemistry, and Biology courses. Equipped with modern labs and experienced faculty.",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Mathematics Department",
      description: "Focuses on conceptual understanding and problem-solving. Organizes regular math workshops.",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Computer Science",
      description: "Teaches programming, networking, and IT skills with hands-on lab sessions and projects.",
      image: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Languages Department",
      description: "Offers English, Tamil, and Hindi with a focus on literature, grammar, and communication skills.",
      image: "https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Social Science",
      description: "Covers History, Geography, Civics, and Economics. Emphasizes critical thinking and awareness.",
      image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Physical Education",
      description: "Promotes fitness, sportsmanship, and team spirit through structured training and competitions.",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <div className="flex flex-col w-full min-h-screen bg-blue-50">
      <Header />

      <main className="flex-1 px-6 py-10">
        <h1 className="mb-10 text-3xl font-bold text-center text-blue-900">
          Departments in Our School
        </h1>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {departments.map((dept, index) => (
            <div
              key={index}
              className="overflow-hidden transition bg-white shadow-md rounded-2xl hover:shadow-xl hover:scale-[1.02]"
            >
              <img
                src={dept.image}
                alt={dept.name}
                className="object-cover w-full h-48"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = "https://via.placeholder.com/400x200?text=Department+Image";
                }}
              />
              <div className="p-5">
                <h2 className="mb-2 text-xl font-semibold text-blue-800">
                  {dept.name}
                </h2>
                <p className="text-gray-700">{dept.description}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Department;