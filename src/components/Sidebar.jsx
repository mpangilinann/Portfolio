import { Link, useLocation } from "react-router-dom";
import { navigationItems } from "../data/navigation";
import { X } from "lucide-react";
import logoLight from "../assets/logo-light.png";
import logoDark from "../assets/logo-dark.png";
import { createPortal } from "react-dom";
import { useRef } from "react";
import useModalFocus from "../hooks/useModalFocus";

export default function Sidebar({ isOpen, onClose, returnFocusRef, darkMode }) {
  const location = useLocation();
  const panelRef = useRef(null);
  const closeRef = useRef(null);
  useModalFocus({ active: isOpen, panelRef, initialFocusRef: closeRef, returnFocusRef, onClose });

  return createPortal(
    <div data-modal-root>
      {/* 1. Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] md:hidden" 
          aria-hidden="true"
          onClick={onClose}
        />
      )}

      {/* 2. Sidebar Drawer */}
      <aside
        ref={panelRef}
        id="mobile-navigation"
        role={isOpen ? "dialog" : undefined}
        aria-modal={isOpen ? "true" : undefined}
        aria-label="Mobile navigation"
        aria-hidden={!isOpen}
        inert={!isOpen}
        tabIndex={-1}
        className={`fixed z-[70] top-0 left-0 h-full w-72 flex flex-col transform transition-transform duration-500 ease-in-out md:hidden
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          ${darkMode ? "bg-black text-white" : "bg-white text-black"} 
          shadow-xl border-r ${darkMode ? "border-white/10" : "border-gray-200"}`}
      >
        {/* Header / Logo Section */}
        <div className={`p-6 border-b flex items-center justify-between ${darkMode ? "border-white/10" : "border-gray-100"}`}>
          <div className="flex items-center gap-3">
            <img 
              src={darkMode ? logoLight : logoDark} 
              alt=""
              className="h-10 w-auto object-contain"
            />
           
          </div>

          {/* Close Button */}
          <button 
            ref={closeRef}
            className={`min-h-11 min-w-11 p-2 rounded-full transition-colors ${darkMode ? "hover:bg-white/10" : "hover:bg-black/5"}`}
            aria-label="Close navigation"
            onClick={onClose}
          >
            <X aria-hidden="true" size={22} />
          </button>
        </div>

        {/* Navigation Section */}
        <nav aria-label="Primary navigation" className="flex-1 p-4 overflow-y-auto pt-8">
          <ul className="space-y-3">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = (location.pathname === item.path || (item.path === "/projects" && location.pathname.startsWith("/projects/")));

              return (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    onClick={onClose}
                    aria-current={isActive ? "page" : undefined}
                    className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl font-medium transition-all duration-300
                      ${isActive 
                        ? (darkMode 
                            ? "bg-white text-black shadow-lg" 
                            : "bg-black text-white shadow-lg") 
                        : (darkMode 
                            ? "text-gray-400 hover:text-white hover:bg-white/5" 
                            : "text-gray-600 hover:text-black hover:bg-black/5")
                      }`}
                  >
                    <Icon aria-hidden="true" size={20} />
                    <span className="text-base">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className={`h-1 w-full opacity-10 ${darkMode ? "bg-white" : "bg-black"}`} />
      </aside>
    </div>, document.body
  );
}
