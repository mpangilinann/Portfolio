import { useState, useRef, useCallback, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { useAnimate } from "framer-motion/mini";
import useReducedMotion from "../hooks/useReducedMotion";
import ThemeIcon from "./ThemeIcon";
import { navigationItems } from "../data/navigation";
import logoLight from "../assets/logo-light-320.webp";
import logoDark from "../assets/logo-dark-320.webp";
import Sidebar from "./Sidebar";

export default function Navbar({ darkMode, setDarkMode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(() => window.scrollY > 24);
  const reduced = useReducedMotion();
  const [headerRef, animate] = useAnimate();
  const { pathname } = useLocation();
  const menuButtonRef = useRef(null);
  const closeMenu = useCallback(() => setIsOpen(false), []);
  const activeIndex = navigationItems.findIndex(item => pathname === item.path || (item.path === "/projects" && pathname.startsWith("/projects/")));
  useEffect(() => {
    const color = getComputedStyle(headerRef.current).getPropertyValue(scrolled ? "--header-scrolled" : "--header-top").trim();
    const animation = animate(headerRef.current, { backgroundColor: color }, { duration: reduced ? 0 : 0.2 });
    return () => animation.stop();
  }, [animate, headerRef, scrolled, reduced, darkMode, pathname]);
  useEffect(() => {
    let current = window.scrollY > 24;
    const handleScroll = () => {
      const next = window.scrollY > 24;
      if (next !== current) { current = next; setScrolled(next); }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => { if (desktop.matches) closeMenu(); };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, [closeMenu]);
  return <>
    <header ref={headerRef} className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="header-inner">
        <Link to="/" aria-label="Mikko Pangilinan — Home" className="brand-link">
          <img src={darkMode ? logoLight : logoDark} alt="" width="320" height="180" decoding="async" />
        </Link>
        <nav aria-label="Primary navigation" className="desktop-nav">
          {navigationItems.map((item, index) => <Link key={item.path} to={item.path} aria-current={index === activeIndex ? "page" : undefined}>
            {item.name}
          </Link>)}
        </nav>
        <div className="header-controls">
          <button type="button" className="icon-button" aria-label={darkMode ? "Switch to light theme" : "Switch to dark theme"} onClick={() => setDarkMode(!darkMode)}><ThemeIcon darkMode={darkMode} /></button>
          <button type="button" ref={menuButtonRef} className="icon-button menu-trigger" aria-label={isOpen ? "Close navigation" : "Open navigation"} aria-expanded={isOpen} aria-controls="mobile-navigation" onClick={() => setIsOpen(!isOpen)}><Menu size={21} aria-hidden="true" /></button>
        </div>
      </div>
    </header>
    <Sidebar isOpen={isOpen} onClose={closeMenu} returnFocusRef={menuButtonRef} />
  </>;
}
