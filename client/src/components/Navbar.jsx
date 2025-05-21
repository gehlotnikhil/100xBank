import { Link } from "react-router-dom";
import { MainContext } from "../contexts/main";
import { useState, useEffect, useContext } from "react";
import { motion ,AnimatePresence} from "framer-motion";

export default function Navbar() {
  const { user, logoutUser } = useContext(MainContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuOpen && !e.target.closest("nav")) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, x: "100%" },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };

  return (
    <nav className="fixed w-full z-50 bg-gradient-to-r from-gray-800 to-blue-800 shadow-lg py-3">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-white text-xl font-bold tracking-wide">
          100xBank
        </Link>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white focus:outline-none relative z-50"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-6 h-6 flex flex-col justify-center items-center">
            <span
              className={`block w-5 h-0.5 bg-white rounded-full transition-transform duration-300 ${
                menuOpen ? "transform rotate-45 translate-y-1" : "mb-1"
              }`}
            ></span>
            <span
              className={`block w-5 h-0.5 bg-white rounded-full transition-opacity duration-300 ${
                menuOpen ? "opacity-0" : "mb-1"
              }`}
            ></span>
            <span
              className={`block w-5 h-0.5 bg-white rounded-full transition-transform duration-300 ${
                menuOpen ? "transform -rotate-45 -translate-y-1" : ""
              }`}
            ></span>
          </div>
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Navigation links */}
          <div className="flex items-center space-x-6 mr-4">
            <Link to="/home" className="text-white hover:text-blue-200 transition duration-200">
              Home
            </Link>
            <Link to="/about" className="text-white hover:text-blue-200 transition duration-200">
              About
            </Link>
            <Link to="/services" className="text-white hover:text-blue-200 transition duration-200">
              Services
            </Link>
            <Link to="/contact" className="text-white hover:text-blue-200 transition duration-200">
              Contact
            </Link>
          </div>

          {/* Auth section */}
          {user ? (
            <div className="relative">
              <motion.button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                  {user.full_name.charAt(0)}
                </div>
                <span>{user.full_name}</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </motion.button>

              {/* Profile dropdown */}
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50"
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user.full_name}</p>
                      <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                    </div>
                    <button
                      onClick={logoutUser}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition duration-200"
                    >
                      Sign out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Link
                to="/login"
                className="text-white border border-blue-300 hover:bg-blue-700 px-4 py-1.5 rounded-lg transition duration-200"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-white text-blue-800 hover:bg-blue-50 font-medium px-5 py-1.5 rounded-lg transition duration-200"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden fixed inset-0 bg-gradient-to-b from-gray-800 to-blue-900 bg-opacity-95 z-40"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="flex flex-col items-center justify-center h-full">
              {/* Navigation links */}
              <Link
                to="/home"
                className="text-white text-xl mb-6 hover:text-blue-200 transition duration-200"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-white text-xl mb-6 hover:text-blue-200 transition duration-200"
                onClick={() => setMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/services"
                className="text-white text-xl mb-6 hover:text-blue-200 transition duration-200"
                onClick={() => setMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                to="/contact"
                className="text-white text-xl mb-6 hover:text-blue-200 transition duration-200"
                onClick={() => setMenuOpen(false)}
              >
                Contact
              </Link>

              {/* Auth section */}
              <div className="mt-6 flex flex-col items-center">
                {user ? (
                  <>
                    <div className="mb-4 flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-semibold mb-2">
                        {user.full_name.charAt(0)}
                      </div>
                      <span className="text-white text-lg">{user.full_name}</span>
                      <span className="text-blue-200 text-sm capitalize">({user.role})</span>
                    </div>
                    <motion.button
                      onClick={() => {
                        logoutUser();
                        setMenuOpen(false);
                      }}
                      className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition duration-200"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Sign out
                    </motion.button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="text-white border border-blue-300 hover:bg-blue-700 px-8 py-2 rounded-lg mb-4 w-48 text-center transition duration-200"
                      onClick={() => setMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="bg-white text-blue-800 hover:bg-blue-50 px-8 py-2 rounded-lg font-medium w-48 text-center transition duration-200"
                      onClick={() => setMenuOpen(false)}
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}