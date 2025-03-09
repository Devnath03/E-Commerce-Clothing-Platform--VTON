import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { User } from "lucide-react";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      {/* Sidebar Toggle Button (Mobile) */}
      <button
        className="fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-lg md:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? (
          /* Close Icon */
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          /* Open Icon */
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed md:relative w-64 min-h-screen bg-white border-r-2 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex flex-col gap-4 pt-6 pl-6 text-[15px]">
          {/* Dashboard Link */}
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 px-5 py-2 rounded-lg transition-all duration-200 ${
                isActive ? "bg-purple-100 text-white" : "text-gray-700 hover:bg-gray-100"
              }`
            }
            to="/dashboard"
          >
            {/* Dashboard Icon */}
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M3 3h18v18H3z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 21V9h6v12M9 9V3h6v6" strokeWidth="2"/>
            </svg>
            <p className="text-black md:block">Dashboard</p>
          </NavLink>
          <p className="text-black font-bold">MAIN</p>
          {/* Add Items Link */}
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 px-5 py-2 rounded-lg transition-all duration-200 ${
                isActive ? "bg-blue-100 text-white" : "text-gray-700 hover:bg-gray-100"
              }`
            }
            to="/add"
          >
            {/* Add Icon */}
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 5v14M5 12h14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p className="text-black md:block">Add Items</p>
          </NavLink>

          {/* List Items Link */}
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 px-5 py-2 rounded-lg transition-all duration-200 ${
                isActive ? "bg-blue-100 text-white" : "text-gray-700 hover:bg-gray-100"
              }`
            }
            to="/list"
          >
            {/* List Icon */}
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M3 6h18M3 12h18M3 18h18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p className="text-black md:block">List Items</p>
          </NavLink>

          {/* Orders Link */}
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 px-5 py-2 rounded-lg transition-all duration-200 ${
                isActive ? "bg-blue-100 text-white" : "text-gray-700 hover:bg-gray-100"
              }`
            }
            to="/orders"
          >
            {/* Orders Icon */}
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M3 3h18v18H3zM7 7h10v10H7z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p className="text-black md:block">Orders</p>
          </NavLink>

          {/* Users Link */}
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 px-5 py-2 rounded-lg transition-all duration-200 ${
                isActive ? "bg-blue-100 text-white" : "text-gray-700 hover:bg-gray-100"
              }`
            }
            to="/users"
          >
            {/* User Icon */}
            <div className="flex items-center space-x-2">
             <User className="w-5 h-5 text-black" />
               <p className="text-black md:block">Users</p>
            </div>      
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
