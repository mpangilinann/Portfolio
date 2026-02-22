import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Resume from "./pages/Resume";
import Contact from "./pages/Contact";
import Footer from "./components/Footer.jsx";
import ScrollToTop from "./components/ScrollToTop";
import { Helmet } from 'react-helmet';

function App() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, [darkMode]);

  return (
    <Router>
      <Helmet>
        
        {/* Google Search Console Verification */}
        <meta name="google-site-verification" content="St31YLJFnn8lcVoAYgiAvr1ziSWgzjthGBDmV0YRwgk" />
        <title>Mikko Pangilinan | Front-End Developer Portfolio</title>
        <meta name="description" content="Portfolio of Mikko Pangilinan, a front-end developer specializing in React, Tailwind, and modern web development." />
      </Helmet>

      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <ScrollToTop /> {/* smooth scroll on route change */}
      <div className="pt-20 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}


export default App;
