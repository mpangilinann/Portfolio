import PageMetadata from "../components/PageMetadata";
import OptimizedImage from "../components/OptimizedImage";
import ProjectDialog from "../components/ProjectDialog";
import { projects } from "../data/projects";
import { useState, useRef, useCallback } from "react";
import { motion as Motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  const currentProject = projects.find(p => p.id === selectedProject);
  const openerRef = useRef(null);
  const closeProject = useCallback(() => setSelectedProject(null), []);

  return (
    <div
      className="min-h-screen pt-24 pb-16"
      style={{
        backgroundColor: "var(--bg-color)",
        color: "var(--text-color)",
        transition: "background-color 0.3s, color 0.3s",
      }}
    >
        <PageMetadata />

      <section className="px-6">
        <div className="max-w-7xl mx-auto text-center mb-20">
          <Motion.h1 id="page-heading"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-bold uppercase tracking-tight"
          >
            Projects
          </Motion.h1>
          <div
            className="h-0.5 w-24 mx-auto my-6 rounded-full"
            style={{
              backgroundColor: "var(--text-color)",
              transition: "background-color 0.3s"
            }}
          />
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, index) => (
            <Motion.article
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="project-card group relative cursor-pointer"
            >
              <div
                className="overflow-hidden rounded-2xl transition-all duration-300 motion-safe:group-hover:-translate-y-2 group-hover:shadow-2xl border"
                style={{
                  backgroundColor: "var(--card-bg)",
                  borderColor: "var(--card-border)",
                }}
              >
                <div className="relative aspect-video overflow-hidden">
                  <OptimizedImage
                    src={project.image}
                    alt={`${project.title} project interface`}
                    sizes="(min-width: 1280px) 400px, (min-width: 1024px) 31vw, (min-width: 768px) 46vw, 100vw"
                    loading={index < 3 ? "eager" : "lazy"}
                    className="w-full h-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-110"
                  />

                  {/* HOVER OVERLAY: Larger text and smoother transition */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center text-white">
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-bold tracking-wider uppercase">
                        View Project
                      </span>
                      <ExternalLink aria-hidden="true" size={22} />
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h2 className="text-xl font-bold mb-3">
                    {project.title}
                  </h2>

                  <p className="text-sm opacity-70 mb-4 leading-relaxed line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech) => (
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
              <button
                type="button"
                aria-label={`View ${project.title} project`}
                aria-haspopup="dialog"
                className="project-card-trigger absolute inset-0 h-full w-full rounded-2xl"
                onClick={event => {
                  openerRef.current = event.currentTarget;
                  setSelectedProject(project.id);
                }}
              />
            </Motion.article>
          ))}
        </div>
      </section>
      <ProjectDialog currentProject={currentProject} onClose={closeProject} returnFocusRef={openerRef} />
    </div>
  );
}
