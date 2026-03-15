import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  User, 
  FileText, 
  Briefcase, 
  Mail 
} from "lucide-react";
import logoLight from "../assets/logo-light.png";
import logoDark from "../assets/logo-dark.png";
import Sidebar from "./Sidebar";

export default function Navbar({ darkMode, setDarkMode }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "About", path: "/about", icon: User },
    { name: "Resume", path: "/resume", icon: FileText },
    { name: "Projects", path: "/projects", icon: Briefcase },
    { name: "Contact", path: "/contact", icon: Mail },
  ];

  return (
    <>
      <header
        className={`fixed top-6 left-1/2 transform -translate-x-1/2 w-[92%] max-w-6xl z-50
                    backdrop-blur-xl shadow-2xl rounded-3xl px-6 py-3 flex items-center justify-between
                    transition-all duration-500 font-geist border
                    ${darkMode 
                      ? "bg-white/90 text-black border-black/5"  // In Dark Mode, Navbar is Light
                      : "bg-black/80 text-white border-white/10" // In Light Mode, Navbar is Dark
                    }`}
      >
        {/* Logo - Logic flipped to match inverted bar */}
        <Link to="/" className="flex items-center">
          <img
            src={darkMode ? logoDark : logoLight}
            alt="Logo"
            className="h-10 md:h-12 transition-transform duration-300 hover:scale-110"
          />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-4 font-medium">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 group
                            ${isActive 
                              ? (darkMode ? "bg-black text-white" : "bg-white text-black") 
                              : (darkMode ? "hover:bg-black/5 text-gray-600" : "hover:bg-white/10 text-gray-300")}`}
              >
                <Icon size={18} className={`transition-transform duration-300 group-hover:-translate-y-0.5 ${isActive ? "opacity-100" : "opacity-70"}`} />
                <span className="text-sm lg:text-base">{item.name}</span>
              </Link>
            );
          })}

          <div className={`h-6 w-[1px] mx-2 ${darkMode ? "bg-black/10" : "bg-white/20"}`} />

          {/* Dark/Light Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2.5 rounded-full transition-all duration-300 hover:rotate-12 active:scale-90
                        ${darkMode ? "bg-black/5 hover:bg-black/10 text-indigo-600" : "bg-white/10 hover:bg-white/20 text-yellow-400"}`}
          >
            {darkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m8.66-9h1m-17.32 0h1M16.24 7.76l.71-.71m-9.9 9.9l.71-.71M16.24 16.24l.71.71m-9.9-9.9l.71.71M12 7a5 5 0 100 10 5 5 0 000-10z" />
              </svg>
            )}
          </button>
        </nav>

        {/* Mobile Controls */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-xl transition-all ${darkMode ? "bg-black/5 text-indigo-600" : "bg-white/10 text-yellow-400"}`}
          >
            {darkMode ? (
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" /></svg>
            ) : (
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m8.66-9h1m-17.32 0h1M16.24 7.76l.71-.71m-9.9 9.9l.71-.71M16.24 16.24l.71.71m-9.9-9.9l.71.71M12 7a5 5 0 100 10 5 5 0 000-10z" /></svg>
            )}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`p-2 rounded-xl transition-colors ${darkMode ? "text-black hover:bg-black/5" : "text-white hover:bg-white/10"}`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </header>

      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} darkMode={darkMode} />
    </>
  );
}