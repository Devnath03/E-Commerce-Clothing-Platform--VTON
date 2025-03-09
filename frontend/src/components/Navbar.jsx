import React, { useContext, useState, useEffect } from "react";
import { assets } from "../assets/assets"; // Ensure this path is correct
import { Link, NavLink, useLocation } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } =
    useContext(ShopContext);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };

  const location = useLocation();

  // Add scroll effect for the "HOME" page
  useEffect(() => {
    if (location.pathname === "/") {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 0);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    } else {
      setIsScrolled(false);
    }
  }, [location]);

  return (
    <div
      className={`flex items-center justify-between px-6 py-4 transition-all duration-200 ${
        isScrolled
          ? "fixed top-0 left-0 right-0 bg-white/10 backdrop-blur-lg shadow-2xl z-50 transition-all duration-900"
          : "relative bg-transparent"
      }`}
    >
      {/* Logo */}
      <Link to="/" className="flex items-center">
        <img
          src={assets.logo}
          className={`transition-all duration-300 ${
            isScrolled ? "w-28" : "w-36"
          }`}
          alt="Logo"
        />
      </Link>

      {/* Navigation Links */}
      <ul className="hidden md:flex gap-8 text-sm text-gray-700">
        <NavLink
          to="/"
          className={`flex flex-col items-center gap-1 group relative ${
            isScrolled ? "text-purple-400" : ""
          }`} // Change color when sticky
        >
          <p>HOME</p>
          <hr
            className={`w-0 h-[1.5px] bg-gray-700 transition-all duration-500 scale-x-0 group-hover:scale-x-90 group-hover:w-3/4 origin-center ${
              isScrolled ? "bg-purple-400" : ""
            }`}
          ></hr>
        </NavLink>
        <NavLink
          to="/collection"
          className="flex flex-col items-center gap-1 group relative"
        >
          <p>COLLECTION</p>
          <hr className="w-0 h-[1.5px] bg-gray-700 transition-all duration-500 scale-x-0 group-hover:scale-x-90 group-hover:w-3/4 origin-center" />
        </NavLink>
        <NavLink
          to="/about"
          className="flex flex-col items-center gap-1 group relative"
        >
          <p>ABOUT</p>
          <hr className="w-0 h-[1.5px] bg-gray-700 transition-all duration-500 scale-x-0 group-hover:scale-x-90 group-hover:w-3/4 origin-center" />
        </NavLink>
        <NavLink
          to="/contact"
          className="flex flex-col items-center gap-1 group relative"
        >
          <p>CONTACT</p>
          <hr className="w-0 h-[1.5px] bg-gray-700 transition-all duration-500 scale-x-0 group-hover:scale-x-90 group-hover:w-3/4 origin-center" />
        </NavLink>
      </ul>

      {/* Icons */}
      <div className="flex items-center gap-6">
        {/* Search Icon */}
        <img
          onClick={() => setShowSearch(true)}
          className="w-5 cursor-pointer transition-transform duration-300 hover:scale-110"
          src={assets.search_icon}
          alt="Search"
        />

        {/* Profile Dropdown */}
        <div className="group relative">
          <img
            onClick={() => (token ? null : navigate("/login"))}
            className="w-5 cursor-pointer transition-transform duration-300 hover:scale-110"
            src={assets.profile_icon}
            alt="Profile"
          />
          {/* --- Dropdown Menu ----*/}
          {token && (
            <div className="group-hover:block hidden absolute right-0 pt-2 z-50">
              <div className="flex flex-col gap-1 w-36 py-2 px-3 bg-slate-100 text-gray-500 rounded shadow-lg">
                <p className="cursor-pointer hover:text-black transition-colors duration-200">
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/orders")}
                  className="cursor-pointer hover:text-black transition-colors duration-200"
                >
                  Orders
                </p>
                <p
                  onClick={logout}
                  className="cursor-pointer hover:text-black transition-colors duration-200"
                >
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>
        {/* Cart Icon */}
        <Link to="/cart" className="relative">
          <img
            src={assets.cart_icon}
            className="w-5 transition-transform duration-300 hover:scale-110"
            alt="Cart"
          />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>

        {/* Menu Icon (for Mobile) */}
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden transition-transform duration-300 hover:scale-110"
          alt="Menu"
        />
      </div>

      {/* Sidebar menu for small screens */}
      <div
        className={`fixed top-0 bottom-0 left-0 right-0 bg-white transition-all ${
          visible ? "w-full" : "w-0"
        } z-50 overflow-y-auto`} // Ensure full width and scrollable
      >
        <div className="flex flex-col text-gray-600">
          {/* Close Button */}
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img
              className="h-4 rotate-180 transition-transform duration-500 hover:scale-110"
              src={assets.dropdown_icon}
              alt=""
            />
            <p>Back</p>
          </div>

          {/* Navigation Links */}
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border-b border-gray-300"
            to="/"
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border-b border-gray-300"
            to="/collection"
          >
            COLLECTION
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border-b border-gray-300"
            to="/about"
          >
            ABOUT
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border-b border-gray-300"
            to="/contact"
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;