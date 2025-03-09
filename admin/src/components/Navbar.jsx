import React, { useState, useEffect, useRef } from 'react';
import { assets } from '../assets/assets';

const Navbar = ({ setToken }) => {
  // State to manage the profile dropdown toggle
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // State to manage whether profile details are shown
  const [showProfileDetails, setShowProfileDetails] = useState(false);

  // Ref for the dropdown container
  const dropdownRef = useRef(null);

  // Open dropdown on hover
  const handleMouseEnter = () => setIsProfileOpen(true);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
        setShowProfileDetails(false); // Reset profile details state
      }
    };

    // Add event listener for clicks outside the dropdown
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close dropdown when clicking an option
  const handleOptionClick = () => {
    setIsProfileOpen(false);
  };

  // Handle profile details click
  const handleProfileClick = () => {
    setShowProfileDetails(true);
  };

  // Handle back to options
  const handleBackToOptions = () => {
    setShowProfileDetails(false);
  };

  return (
    <nav className="flex items-center justify-between py-4 px-[4%] bg-white shadow-md animate-fadeIn">
      {/* Logo with reduced size and hover animation */}
      <img
        className="w-20 sm:w-30 transition-transform duration-300 hover:scale-110 cursor-pointer"
        src={assets.logo}
        alt="Logo"
      />

      {/* Profile Icon with Status and Dropdown */}
      <div
        className="relative"
        onMouseEnter={handleMouseEnter}
        ref={dropdownRef}
      >
        {/* Profile SVG Icon with Status Indicator */}
        <button
          aria-haspopup="true"
          aria-expanded={isProfileOpen}
          className="relative flex items-center justify-center transition-transform duration-300 hover:scale-110"
        >
          <div className="relative w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <svg
              className="absolute w-10 h-10 text-gray-400 -left-1 transition-all duration-300 hover:text-gray-200"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          {/* Green status indicator */}
          <span className="top-0 left-6 absolute w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-200 rounded-full"></span>
        </button>

        {/* Profile and Logout Dropdown */}
        {isProfileOpen && (
          <div
            className="absolute right-0 mt-2 bg-white shadow-lg rounded-md w-48 p-2"
            onMouseLeave={() => setIsProfileOpen(false)}
          >
            {showProfileDetails ? (
              // Profile Details Section
              <div>
                {/* Back Button */}
                <button
                  onClick={handleBackToOptions}
                  className="flex items-center gap-2 w-full text-gray-700 hover:bg-gray-200 p-2 rounded-md transition-all duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Back
                </button>

                {/* Profile Details */}
                <div className="text-gray-700 p-2">
                  <p className="font-semibold">John Doe</p>
                  <p className="text-sm">john.doe@example.com</p>
                  <p className="text-sm">+1 (123) 456-7890</p>
                </div>
              </div>
            ) : (
              // Default Options (Profile and Logout)
              <>
                <button
                  onClick={handleProfileClick}
                  className="flex items-center gap-2 w-full text-gray-700 hover:bg-gray-200 p-2 rounded-md transition-all duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Profile
                </button>
                <button
                  onClick={() => {
                    setToken('');
                    handleOptionClick();
                  }}
                  className="flex items-center gap-2 w-full text-gray-700 hover:bg-gray-200 p-2 rounded-md transition-all duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;