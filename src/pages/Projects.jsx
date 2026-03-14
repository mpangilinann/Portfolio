import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, X, User, Code2, Layers, CheckCircle2 } from "lucide-react";
import { Helmet } from 'react-helmet';
import { useLocation } from "react-router-dom";

export default function Projects() {
  const location = useLocation();
  const [selectedProject, setSelectedProject] = useState(
    location.state?.openProjectId || null
  );

  const projects = [
    {
      id: 1,
      title: "Flashify",
      role: "Fullstack Developer",
      description: "Full-stack quiz and flashcard learning platform built to help students track progress and master subjects.",
      fullDescription: "Flashify is a full-stack learning platform designed to help students study more efficiently through quizzes and flashcards. The platform includes authentication using JWT, a responsive dashboard to manage quizzes, and result tracking to monitor performance. Built using a modern MERN-style architecture.",
      image: "/flashify.png",
      techStack: ["MongoDB", "Express.js", "React.js", "Node.js", "JWT", "TailwindCSS"],
      features: ["JWT Auth", "Quiz CRUD", "Flashcard Mode", "Performance Analytics", "Responsive Dashboard"],
      github: "https://github.com/mpangilinann/Flashify",
      live: "https://flashifylearn.vercel.app/"
    },
    {
      id: 2,
      title: "Thryve",
      role: "Frontend Developer",
      description: "Health and fitness tracker for monitoring workouts, meals, water intake, and daily progress.",
      fullDescription: "Thryve is a comprehensive health and fitness platform where users can calculate BMI, track meals, water intake, workouts, and sleep. A dashboard displays daily stats, and an achievement system rewards progress milestones.",
      image: "/thryve.png",
      techStack: ["Vue.js", "Node.js", "Mongoose", "Vue Router", "Vite", "Express.js"],
      features: ["Meal Tracking", "BMI Calculator", "Sleep Monitoring", "Achievement System", "Progress Charts"],
      github: "https://github.com/iyawnnn/Thryve",
      live: "https://thryvefitness.vercel.app/",
    },
    {
      id: 3,
      title: "The Coffee Lab & Lounge",
      role: "Fullstack Developer",
      description: "Elegant e-commerce platform for a specialty coffee shop with integrated product filtering.",
      fullDescription: "The Coffee Lab & Lounge allows enthusiasts to explore specialty coffee. Users can browse menus, filter by iced/hot/specialty drinks, learn about the bean-to-cup process, and manage a shopping cart.",
      image: "thecoffeelab.png",
      techStack: ['ReactJS', 'TailwindCSS', 'Framer Motion', 'Lucide React', 'React Router'],
      features: ["Product Filtering", "Shopping Cart", "Search Functionality", "Educational Content", "Smooth Animations"],
      github: "https://github.com/mpangilinann/The-Coffee-Lab-Lounge",
      live: "https://thecoffeelabandloungue.vercel.app/",
    },
    {
      id: 4,
      title: "Q-Zone Detailers",
      role: "Frontend Developer",
      description: "Business-focused detailing website showcasing premium services and team expertise.",
      fullDescription: "A multi-page business website developed using Angular and TypeScript. It highlights paint protection and ceramic coating services while managing branch locations and employee directories through structured routing.",
      image: "/qzone.png",
      techStack: ["Angular", "TypeScript", "Bootstrap", "RxJS", "Angular Router"],
      features: ["Multi-page Routing", "Service Packages", "Employee Directory", "Interactive FAQ", "Responsive UI"],
      github: "https://github.com/iyawnnn/Q-Zone-Professional-Detailers",
      live: "https://qzoneph.netlify.app/",
    },
    {
      id: 5,
      title: "TechQuest Jobs",
      role: "Fullstack Developer",
      description: "Curated job board for tech professionals with career growth resources and certifications.",
      fullDescription: "TechQuest Jobs provides curated listings for software development and UI/UX. It offers resume tips, book recommendations, and certification paths to help users advance in the tech industry.",
      image: "/techquestjobs.png",
      techStack: ["HTML", "CSS", "JavaScript", "Local Storage API"],
      features: ["Job Listings", "Career Resources", "Resume Tips", "Book Guides", "Filtered Categories"],
      github: "https://github.com/mpangilinann/TechQuestJobs",
      live: "https://mpangilinann.github.io/TechQuestJobs/",
    },
  ];

  const currentProject = projects.find(p => p.id === selectedProject);

  return (
    <div
      className="min-h-screen pt-24 pb-16"
      style={{
        backgroundColor: "var(--bg-color)",
        color: "var(--text-color)",
        transition: "background-color 0.3s, color 0.3s",
      }}
    >
      <Helmet>
        <title>Projects | Mikko Pangilinan</title>
      </Helmet>

      <section className="px-6">
        <div className="max-w-7xl mx-auto text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 40 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-bold uppercase tracking-tight"
          >
            Projects
          </motion.h1>
          <div 
            className="h-0.5 w-24 mx-auto my-6 rounded-full" 
            style={{ 
              backgroundColor: "var(--text-color)",
              transition: "background-color 0.3s" 
            }} 
          />
        </div>

        {/* GRID: Now using identical spacing and animation from Code 1 */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelectedProject(project.id)}
              className="group cursor-pointer"
            >
              <div
                className="overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border"
                style={{
                  backgroundColor: "var(--card-bg)",
                  borderColor: "var(--card-border)",
                }}
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* HOVER OVERLAY: Larger text and smoother transition */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center text-white">
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-bold tracking-wider uppercase">
                        View Project
                      </span>
                      <ExternalLink size={22} />
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">
                    {project.title}
                  </h3>

                  <p className="text-sm opacity-70 mb-4 leading-relaxed line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {/* Retaining the 3-item limit from first code's card design */}
                    {project.techStack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-3 py-1 rounded-full border"
                        style={{
                          borderColor: "var(--card-border)",
                          backgroundColor: "var(--section-bg)",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* MODAL - RETAINED EXACTLY FROM YOUR SECOND CODE AS REQUESTED */}
      <AnimatePresence>
        {currentProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 50, opacity: 0 }}
              className="w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-3xl border shadow-2xl flex flex-col md:flex-row"
              style={{ 
                backgroundColor: "var(--card-bg)", 
                borderColor: "var(--card-border)",
                transition: "background-color 0.3s, border-color 0.3s"
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Left Side: Visuals */}
              <div className="md:w-1/2 h-64 md:h-auto relative bg-black">
                <img 
                  src={currentProject.image} 
                  alt={currentProject.title} 
                  className="w-full h-full object-cover opacity-80" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
                  <motion.div 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h2 className="text-3xl font-black text-white uppercase leading-tight">
                      {currentProject.title}
                    </h2>
                  </motion.div>
                </div>
              </div>

              {/* Right Side: Content */}
              <div className="md:w-1/2 overflow-y-auto p-8 md:p-12 space-y-8 custom-scrollbar">
                <div className="flex justify-between items-start">
                   <motion.div 
                    initial={{ y: 10, opacity: 0 }} 
                    animate={{ y: 0, opacity: 1 }} 
                    transition={{ delay: 0.3 }}
                    className="space-y-1"
                   >
                     <p className="text-xs uppercase tracking-widest opacity-50 font-bold">Role</p>
                     <div className="flex items-center gap-2 text-xl font-bold italic">
                        <User size={20} className="text-blue-500" />
                        {currentProject.role}
                     </div>
                   </motion.div>
                   <button 
                    onClick={() => setSelectedProject(null)} 
                    className="hover:rotate-90 transition-transform p-2"
                   >
                     <X size={24} />
                   </button>
                </div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="space-y-4">
                  <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest opacity-50">
                    <Layers size={16}/> Overview
                  </h4>
                  <p className="leading-relaxed opacity-80">{currentProject.fullDescription}</p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="space-y-4">
                    <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest opacity-50">
                      <CheckCircle2 size={16}/> Features
                    </h4>
                    <ul className="space-y-2">
                      {currentProject.features.map((f, i) => (
                        <li key={i} className="text-sm flex items-center gap-2 opacity-80">
                          <div className="w-1 h-1 rounded-full bg-blue-500" /> {f}
                        </li>
                      ))}
                    </ul>
                  </motion.div>

                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="space-y-4">
                    <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest opacity-50">
                      <Code2 size={16}/> Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {currentProject.techStack.map(t => (
                        <span 
                          key={t} 
                          className="px-3 py-1 text-[10px] font-bold uppercase rounded-md border" 
                          style={{ 
                            borderColor: "var(--card-border)",
                            backgroundColor: "var(--section-bg)",
                            transition: "all 0.3s"
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>

                <motion.div 
                  initial={{ y: 20, opacity: 0 }} 
                  animate={{ y: 0, opacity: 1 }} 
                  transition={{ delay: 0.7 }} 
                  className="flex flex-col sm:flex-row gap-4 pt-6"
                >
                  <a 
                    href={currentProject.live} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="flex-1 py-4 text-center rounded-xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all hover:opacity-80 shadow-md"
                    style={{
                      backgroundColor: "var(--text-color)",
                      color: "var(--bg-color)"
                    }}
                  >
                    <ExternalLink size={16} /> Live Demo
                  </a>
                  <a 
                    href={currentProject.github} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="flex-1 py-4 border text-center rounded-xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white hover:text-black transition-all" 
                    style={{ 
                      borderColor: "var(--text-color)",
                      color: "var(--text-color)"
                    }}
                  >
                    <Github size={16} /> Source
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}