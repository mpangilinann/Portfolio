import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, X } from "lucide-react";
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
      title: "Thryve",
      description:
        "Thryve is a health and fitness tracker that helps you monitor workouts, meals, water intake, sleep, and overall daily health progress.",
      fullDescription:
        "Thryve is a comprehensive health and fitness platform where users can calculate BMI, track meals, water intake, workouts, and sleep. A dashboard displays daily stats, and an achievement system rewards progress, like drinking eight glasses of water in a day.",
      image: "/thryve.png",
      techStack: ["MongoDB", "Express.js", "Vue.js", "Node.js", "Mongoose", "Vue Router", "Vite"],
      features: [
        "Track workouts, meals, and water intake",
        "Monitor sleep patterns",
        "Dashboard for daily health overview",
        "Achievements for progress milestones",
        "Visual progress charts",
      ],
      github: "https://github.com",
      live: "https://thryve.example.com",
    },
    {
      id: 2,
      title: "The Coffee Lab & Lounge",
      description:
        "An e-commerce platform for a specialty coffee shop showcasing menus, best sellers, roasting process, and allowing filtering by coffee type and style.",
      fullDescription:
        "The Coffee Lab & Lounge is an online platform for coffee enthusiasts to explore specialty coffee offerings. Users can browse menus, discover best sellers, filter products by iced, hot, or specialty drinks, learn about bean-to-cup processes, and add items to the cart.",
      image: "thecoffeelab.png",
      techStack: ["HTML", "CSS", "JavaScript"],
      features: [
        "Showcase menu and best sellers",
        "Filter by coffee type (iced, hot, specialty)",
        "Search bar for easy navigation",
        "Learn coffee bean to cup process",
        "Add products to shopping cart",
      ],
      github: "https://github.com",
      live: "https://coffeelab.example.com",
    },
    {
      id: 3,
      title: "Q-Zone Professional Detailers",
      description:
        "A business-focused car detailing website showcasing services, pricing, company background, and team information through a structured Angular application.",
      fullDescription:
        "Q-Zone Professional Detailers is a multi-page business website developed using Angular and TypeScript. It highlights detailing services such as paint protection, ceramic coating, and full vehicle detailing while also presenting company information, branch locations, testimonials, FAQs, and an employee directory. The platform uses Angular routing and reusable components to create a clear and organized customer journey.",
      image: "/qzone.png",
      techStack: ["Angular", "TypeScript", "Bootstrap", "Angular Router", "RxJS"],
      features: [
        "Multi-page Angular site with Home, About, Services, and Employees pages",
        "Service packages with premium detailing options",
        "Interactive homepage with carousel, workflow steps, testimonials, and FAQs",
        "Employee directory and company branch information",
        "Responsive layout for desktop and mobile devices",
      ],
      github: "https://github.com",
      live: "https://qzone.example.com",
    },
    {
      id: 4,
      title: "TechQuest Jobs",
      description:
        "TechQuest Jobs is a curated job board for tech professionals offering job listings, interview and resume tips, recommended books, and certifications.",
      fullDescription:
        "TechQuest Jobs provides curated job listings for various tech fields including software development, cloud, data analytics, and UI/UX. Users can access resume and interview tips, recommended books, and certifications to help advance their tech careers.",
      image: "/techquestjobs.png",
      techStack: ["HTML", "CSS", "JavaScript"],
      features: [
        "Curated job listings for multiple tech fields",
        "Interview and resume tips",
        "Book recommendations for tech skills",
        "Certifications recommendations",
        "Explore career growth resources",
      ],
      github: "https://github.com",
      live: "https://techquest.example.com",
    },

  ];

  const currentProject = projects.find(
    (project) => project.id === selectedProject
  );

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
        <meta
          name="description"
          content="Explore web development projects by Mikko Pangilinan, showcasing responsive designs, modern UI implementations, and real-world front-end applications."
        />
      </Helmet>


      <section className="px-6">
        <div className="max-w-7xl mx-auto text-center mb-20">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-bold tracking-tight"
          >
            MY PROJECTS
          </motion.h1>

          <div
            className="h-0.5 w-24 mx-auto my-6 rounded-full"
            style={{ backgroundColor: "var(--text-color)" }}
          />

          <p className="text-lg opacity-70 max-w-2xl mx-auto">
            A showcase of my recent web development projects featuring modern
            technologies and responsive design.
          </p>
        </div>

        {/* GRID */}
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

                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center text-white">
                    <div className="flex items-center gap-3">
                      <span className="uppercase text-sm tracking-widest font-semibold">
                        View Project
                      </span>
                      <ExternalLink size={20} />
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">
                    {project.title}
                  </h3>

                  <p className="text-sm opacity-70 mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
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

      {/* MODAL */}
      <AnimatePresence>
        {currentProject && (
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border"
              style={{
                backgroundColor: "var(--card-bg)",
                borderColor: "var(--card-border)",
              }}
            >
              <div
                className="flex justify-between items-center p-6 border-b sticky top-0 z-50 rounded-t-3xl backdrop-blur-md"

                style={{
                  backgroundColor: "var(--card-bg)",
                  borderColor: "var(--card-border)",
                }}
              >
                <h2 className="text-2xl font-bold">
                  {currentProject.title}
                </h2>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 rounded-full transition hover:opacity-70"
                >
                  <X size={22} />
                </button>
              </div>

              <div className="p-6 space-y-8">
                <img
                  src={currentProject.image}
                  alt={currentProject.title}
                  className="w-full aspect-video object-cover rounded-2xl"
                />

                <div>
                  <h3 className="font-bold mb-3">Overview</h3>
                  <p className="opacity-80 leading-relaxed">
                    {currentProject.fullDescription}
                  </p>
                </div>

                <div>
                  <h3 className="font-bold mb-3">Key Features</h3>
                  <ul className="space-y-2">
                    {currentProject.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 opacity-80"
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full mt-2"
                          style={{ backgroundColor: "var(--text-color)" }}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold mb-3">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {currentProject.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-4 py-2 text-sm rounded-full border"
                        style={{
                          backgroundColor: "var(--section-bg)",
                          borderColor: "var(--card-border)",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <a
                    href={currentProject.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 text-center rounded-full uppercase text-sm tracking-widest font-medium flex items-center justify-center gap-2"
                    style={{
                      backgroundColor: "var(--text-color)",
                      color: "var(--bg-color)",
                    }}
                  >
                    <ExternalLink size={18} />
                    Live Demo
                  </a>

                  <a
                    href={currentProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 text-center rounded-full uppercase text-sm tracking-widest font-medium border flex items-center justify-center gap-2"
                    style={{
                      borderColor: "var(--text-color)",
                      color: "var(--text-color)",
                    }}
                  >
                    <Github size={18} />
                    View Code
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
