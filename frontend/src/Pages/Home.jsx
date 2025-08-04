import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const sampleImages = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1350&q=80",
    alt: "Students in classroom",
    caption: "Interactive Learning Environment"
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=1350&q=80",
    alt: "Teacher helping students",
    caption: "Dedicated Faculty Support"
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1350&q=80",
    alt: "School building",
    caption: "State-of-the-Art Facilities"
  }
];

const galleryImages = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1541178735493-479c1a27ed24?auto=format&fit=crop&w=1350&q=80",
    alt: "Science lab",
    category: "Facilities"
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1350&q=80",
    alt: "Sports day",
    category: "Events"
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1350&q=80",
    alt: "Library",
    category: "Facilities"
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1350&q=80",
    alt: "Group study",
    category: "Academics"
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1350&q=80",
    alt: "Graduation ceremony",
    category: "Events"
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1588072432904-843af37f03ed?auto=format&fit=crop&w=1350&q=80",
    alt: "Computer lab",
    category: "Facilities"
  }
];

const services = [
  {
    id: 1,
    title: "Student Portal",
    description: "Access grades, attendance, and assignments",
    icon: "👨‍🎓",
    link: "/student-login"
  },
  {
    id: 2,
    title: "Parent Portal",
    description: "Monitor your child's progress and communicate with teachers",
    icon: "👪",
    link: "/"
  },
  {
    id: 3,
    title: "Faculty Portal",
    description: "Lesson plans, gradebooks, and communication tools",
    icon: "👩‍🏫",
    link: "/teacher-login"
  },
  {
    id: 4,
    title: "School Calendar",
    description: "View all important dates and events",
    icon: "📅",
    link: "/calendar"
  }
];

const colorThemes = {
  primary: {
    bg: "bg-blue-900",
    text: "text-blue-900",
    lightBg: "bg-blue-50",
    border: "border-blue-900",
    hover: "hover:bg-blue-800",
    gradientFrom: "from-blue-900",
    gradientTo: "to-blue-800",
    rgb: "rgb(30, 58, 138)"
  },
  secondary: {
    bg: "bg-emerald-600",
    text: "text-emerald-600",
    lightBg: "bg-emerald-50",
    border: "border-emerald-600",
    hover: "hover:bg-emerald-700",
    gradientFrom: "from-emerald-600",
    gradientTo: "to-emerald-800",
    rgb: "rgb(5, 150, 105)"
  },
  accent: {
    bg: "bg-amber-500",
    text: "text-amber-500",
    lightBg: "bg-amber-50",
    border: "border-amber-500",
    hover: "hover:bg-amber-600",
    gradientFrom: "from-amber-500",
    gradientTo: "to-amber-700",
    rgb: "rgb(245, 158, 11)"
  }
};

const ContinuousMarquee = () => {
  const announcements = [
    "📢 Admissions open for 2024!",
    "🧑‍🏫 Parent-teacher meeting scheduled for December 5th, 2024",
    "🎉 School's Annual Day celebration on December 20th, 2024",
    "📝 Exam Schedule Released - Check your portal",
    "🏖️ Winter Break: December 22nd to January 5th",
    "📚 New library resources now available"
  ];

  const duplicatedAnnouncements = [...announcements, ...announcements];

  return (
    <div className="relative py-3 overflow-hidden text-white bg-blue-900">
      <div className="whitespace-nowrap">
        <div className="inline-block animate-marquee">
          {duplicatedAnnouncements.map((announcement, index) => (
            <span key={index} className="mx-8 text-sm font-medium">
              {announcement}
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </div>
  );
};

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHoveringSlider, setIsHoveringSlider] = useState(false);
  const [visibleGalleryItems, setVisibleGalleryItems] = useState([]);
  const [theme, setTheme] = useState(colorThemes.primary);

  // Auto-advance slider
  useEffect(() => {
    if (isHoveringSlider) return;
    
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % sampleImages.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isHoveringSlider]);

  // Scroll animation for gallery
  useEffect(() => {
    const isElementInView = (el) => {
      const rect = el.getBoundingClientRect();
      return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.75
      );
    };

    const handleScroll = () => {
      const galleryItems = document.querySelectorAll(".gallery-item");
      galleryItems.forEach((item, index) => {
        if (isElementInView(item)) {
          setVisibleGalleryItems(prev => 
            prev.includes(index) ? prev : [...prev, index]
          );
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Announcement scroll effect
  useEffect(() => {
    const announcementBox = document.querySelector('.announcement-box');
    const announcementList = document.querySelector('.announcement-list');
    
    if (announcementBox && announcementList) {
      // Clone the list items for seamless scrolling
      const items = announcementList.querySelectorAll('li');
      items.forEach(item => {
        const clone = item.cloneNode(true);
        announcementList.appendChild(clone);
      });
      
      // Set animation duration based on number of items
      const duration = items.length * 3;
      announcementList.style.animationDuration = `${duration}s`;
    }
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % sampleImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + sampleImages.length) % sampleImages.length);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-b from-blue-50 to-white">
      <Header theme={theme} />
      
      <main className="w-full px-4 pt-16 pb-16 mx-auto max-w-7xl"> {/* Increased pt-8 to pt-16 for more top gap */}
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center mb-16 text-center">
          <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
            Welcome to <span className="text-blue-900">Kodebloom</span> Technology
          </h1>
          <p className="max-w-2xl mb-8 text-lg text-gray-600">
            Our comprehensive school management system connects students, parents, 
            and faculty with innovative tools for academic excellence.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/student-login" 
              className="px-8 py-3 font-medium text-white transition-all duration-300 transform bg-blue-900 rounded-lg shadow-lg hover:bg-blue-800 hover:scale-105"
            >
              Login Portal
            </Link>
            <Link 
              to="/about" 
              className="px-8 py-3 font-medium text-blue-900 transition-all duration-300 transform bg-white border-2 border-blue-900 rounded-lg shadow-lg hover:bg-blue-50 hover:scale-105"
            >
              Learn More
            </Link>
          </div>
        </section>

        <div className="flex flex-col gap-8 mb-16 lg:flex-row">
          {/* Enhanced Image Slider with decreased height */}
          <div 
            className="relative flex-1 overflow-hidden shadow-2xl rounded-xl h-[22rem]"
            onMouseEnter={() => setIsHoveringSlider(true)}
            onMouseLeave={() => setIsHoveringSlider(false)}
          >
            <div className="relative h-full">
              {sampleImages.map((image, index) => (
                <div
                  key={image.id}
                  className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                >
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="text-xl font-bold">{image.caption}</h3>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Navigation Arrows */}
            <button 
              onClick={prevSlide}
              className="absolute p-2 text-white transition-all -translate-y-1/2 rounded-full left-4 top-1/2 bg-black/30 hover:bg-black/50"
              aria-label="Previous slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={nextSlide}
              className="absolute p-2 text-white transition-all -translate-y-1/2 rounded-full right-4 top-1/2 bg-black/30 hover:bg-black/50"
              aria-label="Next slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            {/* Pagination Dots */}
            <div className="absolute left-0 right-0 flex justify-center gap-2 bottom-4">
              {sampleImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-white w-6' : 'bg-white/50'}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Announcements Section with matching decreased height */}
          <div className="flex-none w-full h-[22rem] p-4 text-white bg-blue-900 rounded-lg lg:w-1/3">
            <h3 className="pb-3 text-lg font-semibold">Announcements</h3>
            <div className="h-[calc(100%-2.75rem)] overflow-hidden announcement-box">
              <ul className="space-y-2 announcement-list animate-scroll-vertical">
                <li className="text-sm">
                  <Link to="/admissions" className="block transition-colors hover:text-blue-300">
                    Admissions open for 2024!
                  </Link>
                </li>
                <li className="text-sm">
                  <Link to="/events" className="block transition-colors hover:text-blue-300">
                    Parent-teacher meeting on Dec 5, 2024
                  </Link>
                </li>
                <li className="text-sm">
                  <Link to="/annual-day" className="block transition-colors hover:text-blue-300">
                    Annual Day celebration: Dec 20, 2024
                  </Link>
                </li>
                <li className="text-sm">
                  <Link to="/holidays" className="block transition-colors hover:text-blue-300">
                    Upcoming Holidays
                  </Link>
                </li>
                <li className="text-sm">
                  <Link to="/exam-schedule" className="block transition-colors hover:text-blue-300">
                    Examination Schedule Released
                  </Link>
                </li>
                <li className="text-sm">
                  <Link to="/library" className="block transition-colors hover:text-blue-300">
                    New library resources available
                  </Link>
                </li>
                <li className="text-sm">
                  <Link to="/sports" className="block transition-colors hover:text-blue-300">
                    Sports day preparations underway
                  </Link>
                </li>
                <li className="text-sm">
                  <Link to="/transport" className="block transition-colors hover:text-blue-300">
                    Bus route will have a temporary change next week
                  </Link>
                </li>
                <li className="text-sm">
                  <Link to="/cafeteria" className="block transition-colors hover:text-blue-300">
                    New healthy meal options in cafeteria starting Monday
                  </Link>
                </li>
                <li className="text-sm">
                  <Link to="/scholarships" className="block transition-colors hover:text-blue-300">
                    Scholarship applications due by January 30th
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Services Section - Added more margin-top */}
        <section className="mt-24 mb-20">
          <div className="text-center">
            <h2 className="mb-2 text-2xl font-bold text-gray-900">Our Services</h2>
            <p className="max-w-2xl mx-auto mb-12 text-gray-600">
              Comprehensive tools designed to enhance the educational experience for all community members
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </section>

        {/* Running News Marquee */}
        <div className="mb-16">
          <ContinuousMarquee />
        </div>

        {/* Gallery Section */}
        <section className="mb-20">
          <div className="text-center">
            <h2 className="mb-2 text-2xl font-bold text-gray-900">School Gallery</h2>
            <p className="max-w-2xl mx-auto mb-12 text-gray-600">
              Explore moments from our vibrant school community
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {galleryImages.map((image, index) => (
              <GalleryItem 
                key={image.id} 
                image={image} 
                index={index} 
                isVisible={visibleGalleryItems.includes(index)}
              />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link 
              to="/gallery" 
              className="inline-flex items-center px-6 py-3 font-medium text-blue-900 transition-all duration-300 border border-blue-900 rounded-lg hover:bg-blue-50 hover:shadow-md"
            >
              View Full Gallery
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 mb-16 bg-blue-900 rounded-xl">
          <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
            <StatItem number="1500+" label="Students" />
            <StatItem number="100+" label="Faculty" />
            <StatItem number="25+" label="Programs" />
            <StatItem number="95%" label="Satisfaction" />
          </div>
        </section>

        {/* CTA Section */}
        <section className="p-8 mb-12 text-center bg-white shadow-lg rounded-xl">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">Ready to Join Our Community?</h2>
          <p className="max-w-2xl mx-auto mb-8 text-gray-600">
            Discover how our school can help your child achieve their full potential
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/admissions" 
              className="px-8 py-3 font-medium text-white transition-all duration-300 transform bg-blue-900 rounded-lg shadow-lg hover:bg-blue-800 hover:scale-105"
            >
              Apply Now
            </Link>
            <Link 
              to="/contact" 
              className="px-8 py-3 font-medium text-blue-900 transition-all duration-300 transform bg-white border-2 border-blue-900 rounded-lg shadow-lg hover:bg-blue-50 hover:scale-105"
            >
              Contact Us
            </Link>
          </div>
        </section>
      </main>

      {/* Floating Action Button */}
      <Link to="/enquiry">
        <button className="fixed z-50 flex items-center justify-center p-4 text-white transition-all duration-300 transform bg-blue-900 rounded-full shadow-xl bottom-8 right-8 hover:bg-blue-800 hover:scale-110 group">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <span className="absolute right-0 px-2 py-1 text-xs font-medium text-white bg-blue-800 rounded-full -top-2 animate-pulse">
            New
          </span>
          <span className="absolute left-0 hidden p-2 text-sm font-medium text-white bg-blue-900 rounded-lg w-36 group-hover:block -top-14">
            Have questions?
          </span>
        </button>
      </Link>

      <Footer />

      <style jsx global>{`
        @keyframes scrollVertical {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        .animate-scroll-vertical {
          animation: scrollVertical 20s linear infinite;
        }
        .animate-scroll-vertical:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

const ServiceCard = ({ service, index }) => {
  // Updated to use blue-900 color scheme for all cards
  const colorVariants = [
    {
      bg: "bg-blue-100",
      iconBg: "bg-blue-100",
      iconText: "text-blue-900",
      border: "border-blue-200",
      hoverBorder: "hover:border-blue-500",
      accent: "bg-blue-900"
    },
    {
      bg: "bg-blue-100",
      iconBg: "bg-blue-100",
      iconText: "text-blue-900",
      border: "border-blue-200",
      hoverBorder: "hover:border-blue-400",
      accent: "bg-blue-900"
    },
    {
      bg: "bg-blue-100",
      iconBg: "bg-blue-100",
      iconText: "text-blue-900",
      border: "border-blue-200",
      hoverBorder: "hover:border-blue-400",
      accent: "bg-blue-900"
    },
    {
      bg: "bg-blue-100",
      iconBg: "bg-blue-100",
      iconText: "text-blue-900",
      border: "border-blue-200",
      hoverBorder: "hover:border-blue-400",
      accent: "bg-blue-900"
    }
  ];

  const variant = colorVariants[index % colorVariants.length];

  return (
    <Link
      to={service.link}
      className={`relative h-full p-6 transition-all duration-300 rounded-lg shadow-sm border ${variant.border} ${variant.hoverBorder} ${variant.bg} hover:shadow-md group overflow-hidden`}
    >
      <div className={`flex items-center justify-center w-16 h-16 mb-6 text-3xl rounded-lg ${variant.iconBg} ${variant.iconText}`}>
        {service.icon}
      </div>
      <h3 className="mb-3 text-xl font-semibold text-gray-800">{service.title}</h3>
      <p className="text-gray-600">{service.description}</p>
      <div className={`absolute bottom-0 left-0 right-0 h-1 ${variant.accent} transition-transform duration-300 origin-left transform scale-x-0 group-hover:scale-x-100`}></div>
      <div className="absolute bottom-0 right-0 p-2 transition-transform duration-300 translate-x-4 group-hover:translate-x-0">
        <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 ${variant.iconText}`} viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </div>
    </Link>
  );
};

const GalleryItem = ({ image, index, isVisible }) => {
  return (
    <div 
      className={`gallery-item transition-all duration-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="overflow-hidden rounded-lg shadow-md hover:shadow-xl">
        <img 
          src={image.url} 
          alt={image.alt} 
          className="object-cover w-full h-64 transition-transform duration-300 hover:scale-105"
        />
        <div className="p-4 bg-white">
          <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-900 rounded-full bg-blue-50">
            {image.category}
          </span>
        </div>
      </div>
    </div>
  );
};

const StatItem = ({ number, label }) => {
  return (
    <div className="p-4 text-white">
      <p className="text-4xl font-bold">{number}</p>
      <p className="text-lg font-medium">{label}</p>
    </div>
  );
};

export default Home;