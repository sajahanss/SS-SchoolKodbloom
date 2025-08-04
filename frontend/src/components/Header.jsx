import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const buttonStyles = {
    base: "text-sm px-4 py-2 rounded-md font-medium transition-all duration-200",
    navButton: "text-white hover:bg-blue-700 hover:text-white border-b-2 border-transparent hover:border-white",
  };

  const navData = {
    logo: {
      name: "KODEBLOOM",
      path: "/",
    },
    mainLinks: [
      { name: "Home", path: "/" },
      { name: "About", path: "/about" },
      { name: "Contact", path: "/contact" },
       { name: "Department", path: "/department" },
    ],
  };

  return (
    <>
      <header className="fixed top-0 left-0 z-50 w-full px-6 py-4 text-white bg-blue-900 shadow-md">
        <div className="flex items-center justify-between mx-auto max-w-7xl">
          {/* Logo */}
          <Link
            to={navData.logo.path}
            className="text-xl font-bold tracking-tight transition-colors hover:text-white"
          >
            {navData.logo.name}
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-4">
            {/* Main Navigation Links */}
            <div className="items-center hidden gap-1 md:flex">
              {navData.mainLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`${buttonStyles.base} ${buttonStyles.navButton}`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Login Button */}
            <button
              onClick={() => navigate("/select-role")}
              className={`${buttonStyles.base} ${buttonStyles.navButton}`}
            >
              Login
            </button>
          </div>
        </div>
      </header>

      {/* Spacer */}
      <div className="h-16"></div>
    </>
  );
};

export default Header;