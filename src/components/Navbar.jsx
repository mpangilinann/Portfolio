import { useState, useRef, useCallback, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import ThemeIcon from "./ThemeIcon";
import { navigationItems } from "../data/navigation";

import logoLight from "../assets/logo-light.png";
import logoDark from "../assets/logo-dark.png";
import Sidebar from "./Sidebar";

export default function Navbar({ darkMode, setDarkMode }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const menuButtonRef = useRef(null);
  const closeMenu = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 768px)');
    const closeOnDesktop = () => { if (desktop.matches) closeMenu(); };
    desktop.addEventListener('change', closeOnDesktop);
    return () => desktop.removeEventListener('change', closeOnDesktop);
  }, [closeMenu]);

  return (
    <>
      <header
        style={{ '--focus-color': darkMode ? '#000000' : '#ffffff' }}
        className={`fixed top-6 left-1/2 transform -translate-x-1/2 w-[92%] max-w-6xl z-50
                    backdrop-blur-xl shadow-2xl rounded-3xl px-6 py-3 flex items-center justify-between
                    transition-all duration-500 font-geist border
                    ${darkMode 
                      ? "bg-white/90 text-black border-black/5"  // In Dark Mode, Navbar is Light
                      : "bg-black/80 text-white border-white/10" // In Light Mode, Navbar is Dark
                    }`}
      >
        {/* Logo - Logic flipped to match inverted bar */}
        <Link to="/" aria-label="Mikko Pangilinan — Home" className="flex items-center">
          <img
            src={darkMode ? logoDark : logoLight}
            alt=""
            className="h-10 md:h-12 transition-transform duration-300 motion-safe:hover:scale-110"
          />
        </Link>

        {/* Desktop Menu */}
        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-1 lg:gap-4 font-medium">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = (location.pathname === item.path || (item.path === "/projects" && location.pathname.startsWith("/projects/")));

            return (
              <Link
                key={item.name}
                to={item.path}
                aria-current={isActive ? "page" : undefined}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 group
                            ${isActive 
                              ? (darkMode ? "bg-black text-white" : "bg-white text-black") 
                              : (darkMode ? "hover:bg-black/5 text-gray-600" : "hover:bg-white/10 text-gray-300")}`}
              >
                <Icon aria-hidden="true" size={18} className={`transition-transform duration-300 motion-safe:group-hover:-translate-y-0.5 ${isActive ? "opacity-100" : "opacity-70"}`} />
                <span className="text-sm lg:text-base">{item.name}</span>
              </Link>
            );
          })}

          <div className={`h-6 w-[1px] mx-2 ${darkMode ? "bg-black/10" : "bg-white/20"}`} />

          {/* Dark/Light Toggle */}
          <button
            aria-label={darkMode ? "Switch to light theme" : "Switch to dark theme"}
            onClick={() => setDarkMode(!darkMode)}
            className={`min-h-11 min-w-11 p-2.5 rounded-full transition-all duration-300 motion-safe:hover:rotate-12 motion-safe:active:scale-90
                        ${darkMode ? "bg-black/5 hover:bg-black/10 text-indigo-600" : "bg-white/10 hover:bg-white/20 text-yellow-400"}`}
          >
            <ThemeIcon darkMode={darkMode} />
          </button>
        </nav>

        {/* Mobile Controls */}
        <div className="md:hidden flex items-center gap-2">
          <button
            aria-label={darkMode ? "Switch to light theme" : "Switch to dark theme"}
            onClick={() => setDarkMode(!darkMode)}
            className={`min-h-11 min-w-11 p-2 rounded-xl transition-all ${darkMode ? "bg-black/5 text-indigo-600" : "bg-white/10 text-yellow-400"}`}
          >
            <ThemeIcon darkMode={darkMode} />
          </button>

          <button
            ref={menuButtonRef}
            aria-label={isOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsOpen(!isOpen)}
            className={`min-h-11 min-w-11 p-2 rounded-xl transition-colors ${darkMode ? "text-black hover:bg-black/5" : "text-white hover:bg-white/10"}`}
          >
            <svg aria-hidden="true" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </header>

      <Sidebar isOpen={isOpen} onClose={closeMenu} returnFocusRef={menuButtonRef} darkMode={darkMode} />
    </>
  );
}
