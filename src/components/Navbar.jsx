import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logoLight from "../assets/logo-light.png";
import logoDark from "../assets/logo-dark.png";

export default function Navbar({ darkMode, setDarkMode }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleDarkMode = () => setDarkMode(!darkMode);



  const links = ["Home", "About", "Resume", "Projects", "Contact"];

  return (
    <header
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 w-11/12 max-w-5xl z-50
                  backdrop-blur-md shadow-lg rounded-2xl px-6 py-3 flex items-center justify-between
                  transition-colors duration-300 font-geist
                  ${darkMode ? "bg-white/90 text-black" : "bg-black/80 text-white"}`}
    >
      {/* Logo */}
      <Link to="/">
        <img
          src={darkMode ? logoDark : logoLight}
          alt="Mikko Pangilinan Logo"
          className="h-12 transition-all duration-300 hover:scale-105"
        />
      </Link>

      {/* Desktop Menu */}
      <nav className="hidden md:flex items-center gap-8 font-medium text-base md:text-lg transition-colors duration-300">
        {links.map((item) => {
          const path = item.toLowerCase() === "home" ? "/" : `/${item.toLowerCase()}`;
          const isActive = location.pathname === path;

          return (
            <Link
              key={item}
              to={path}
              className={`relative group transition-all duration-300
                          ${darkMode ? "hover:text-gray-700" : "hover:text-gray-300"}
                          ${isActive ? "font-bold" : ""}`}
            >
              {item}
              <span
                className={`absolute left-0 -bottom-1 w-0 h-0.5 transition-all duration-300
                            ${isActive ? (darkMode ? "bg-black w-full" : "bg-white w-full") : ""}`}
              ></span>
            </Link>
          );
        })}

        {/* Dark/Light Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`ml-4 p-2 rounded-full transition-transform duration-300 hover:scale-110
                      ${darkMode ? "hover:bg-gray-200" : "hover:bg-gray-700"}`}
        >
          {darkMode ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 3v1m0 16v1m8.66-9h1m-17.32 0h1M16.24 7.76l.71-.71m-9.9 9.9l.71-.71M16.24 16.24l.71.71m-9.9-9.9l.71.71M12 7a5 5 0 100 10 5 5 0 000-10z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
              />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile Hamburger */}
      <div className="md:hidden flex items-center gap-3">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-2 rounded-full transition-transform duration-300 hover:scale-110
                      ${darkMode ? "hover:bg-gray-200" : "hover:bg-gray-700"}`}
        >
          {darkMode ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 3v1m0 16v1m8.66-9h1m-17.32 0h1M16.24 7.76l.71-.71m-9.9 9.9l.71-.71M16.24 16.24l.71.71m-9.9-9.9l.71.71M12 7a5 5 0 100 10 5 5 0 000-10z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
              />
            </svg>
          )}
        </button>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`text-white dark:text-black focus:outline-none transition-colors duration-300`}
        >
          {isOpen ? (
            <svg className="w-6 h-6 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <nav
          className={`absolute top-full left-1/2 transform -translate-x-1/2 w-11/12 max-w-md
                      backdrop-blur-md flex flex-col items-center gap-4 py-4 md:hidden rounded-b-2xl shadow-lg animate-fadeIn
                      ${darkMode ? "bg-white/90 text-black" : "bg-black/80 text-white"}`}
        >
          {links.map((item) => {
            const path = item.toLowerCase() === "home" ? "/" : `/${item.toLowerCase()}`;
            const isActive = location.pathname === path;

            return (
              <Link
                key={item}
                to={path}
                onClick={() => setIsOpen(false)}
                className={`transition-transform duration-300 hover:scale-105
                            ${isActive ? "font-bold underline" : ""}`}
              >
                {item}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}
