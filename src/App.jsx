import useTheme from "./hooks/useTheme";
import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer.jsx";
import ScrollToTop from "./components/ScrollToTop";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Projects = lazy(() => import("./pages/Projects"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const Resume = lazy(() => import("./pages/Resume"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

function RouteLoading() {
  return <div className="min-h-[75vh] px-6 pt-24">
    <h1 id="page-heading" className="sr-only">Loading page</h1>
    <p role="status" aria-live="polite">Loading page...</p>
  </div>;
}

function App() {
  const [darkMode, setDarkMode] = useTheme();

  return (
    <Router>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <main id="main-content" tabIndex={-1} aria-labelledby="page-heading" className="pt-20 min-h-screen">
        <Suspense fallback={<RouteLoading />}>
        {/* Commit scrolling/focus only when the destination page has loaded. */}
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
      </main>
      <Footer />
    </Router>
  );
}


export default App;
