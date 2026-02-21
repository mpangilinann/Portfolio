import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, X } from "lucide-react";
import { Helmet } from 'react-helmet';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: "Thryve",
      description:
        "A comprehensive wellness platform for tracking health goals and progress with real-time visualization.",
      fullDescription:
        "Thryve is a full-featured wellness application that combines health tracking, goal setting, and professional consultation in one seamless platform. Users can log daily activities, monitor vital statistics, and receive intelligent insights to improve their wellness journey.",
      image:
        "https://images.unsplash.com/photo-1759884247173-3db27f7fafef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      techStack: ["React", "Tailwind CSS", "Firebase", "Chart.js"],
      features: [
        "Real-time health metrics tracking",
        "Personalized goal setting",
        "Wearable device integration",
        "Professional consultation booking",
        "Community features",
      ],
      github: "https://github.com",
      live: "https://thryve.example.com",
    },
    {
      id: 2,
      title: "The Coffee Lab & Lounge",
      description:
        "An elegant e-commerce platform for a specialty coffee shop with ordering and reservations.",
      fullDescription:
        "The Coffee Lab & Lounge brings the coffeehouse experience online with a refined e-commerce platform. Customers can browse the menu, place orders, reserve tables, and subscribe to monthly coffee deliveries.",
      image:
        "https://images.unsplash.com/photo-1513187235015-817efe8fc5b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      techStack: ["React", "Node.js", "MongoDB", "Stripe"],
      features: [
        "Online ordering system",
        "Table reservations",
        "Subscription management",
        "Secure Stripe payments",
        "Admin inventory dashboard",
      ],
      github: "https://github.com",
      live: "https://coffeelab.example.com",
    },
    {
      id: 3,
      title: "TechQuest Job",
      description:
        "A modern job board platform designed specifically for tech professionals.",
      fullDescription:
        "TechQuest Job streamlines the tech hiring process with advanced filtering, application tracking, company profiles, and personalized job recommendations.",
      image:
        "https://images.unsplash.com/photo-1555949963-aa79dcee981c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      techStack: ["Next.js", "PostgreSQL", "Prisma", "Tailwind CSS"],
      features: [
        "Advanced job filtering",
        "Application tracking",
        "Company profiles",
        "Resume builder",
        "Email notifications",
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
                    className="w-full h-full object-cover grayscale transition-transform duration-500 group-hover:scale-110"
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
                  className="w-full aspect-video object-cover rounded-2xl grayscale"
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
