import { Link, useLocation } from "react-router-dom";

export default function Sidebar({ isOpen, setIsOpen, darkMode, links }) {
  const location = useLocation();

  return (
    <div
      className={`fixed inset-0 z-[100] flex transition-opacity duration-300 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Clickable overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Sidebar */}
      <div
        className={`relative h-full w-2/3 sm:w-1/2
                    ${darkMode ? "bg-black text-white" : "bg-white text-black"}
                    shadow-xl transform transition-transform duration-500
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}
                    flex flex-col overflow-y-auto`}
      >
        {/* Top: Close button with underline */}
        <div className="flex items-center justify-end p-6 border-b border-opacity-10">
          <button onClick={() => setIsOpen(false)} className="p-2 rounded-full hover:bg-gray-300 transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className={`h-0.5 ${darkMode ? "bg-white" : "bg-black"}`} />

        {/* Nav Links */}
        <div className="flex-1 flex flex-col justify-start items-center gap-6 mt-10">
          {links.map((item) => {
            const path = item.toLowerCase() === "home" ? "/" : `/${item.toLowerCase()}`;
            const isActive = location.pathname === path;

            return (
              <Link
                key={item}
                to={path}
                onClick={() => setIsOpen(false)}
                className={`text-xl md:text-2xl font-medium transition-transform duration-300 hover:scale-105 ${
                  isActive ? "font-bold underline" : ""
                }`}
              >
                {item}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}