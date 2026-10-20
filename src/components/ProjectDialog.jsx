import { useEffect } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, X, User, Code2, Layers, CheckCircle2 } from "lucide-react";

export default function ProjectDialog({ currentProject, onClose }) {
  useEffect(() => {
    if (!currentProject) return;
    const handleKey = event => { if (event.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [currentProject, onClose]);
  return (
      <AnimatePresence>
        {currentProject && (
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center p-4"
            onClick={() => onClose()}
          >
            <Motion.div
              initial={{ scale: 0.9, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 50, opacity: 0 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-dialog-title"
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
                  <Motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h2 id="project-dialog-title" className="text-3xl font-black text-white uppercase leading-tight">
                      {currentProject.title}
                    </h2>
                  </Motion.div>
                </div>
              </div>

              {/* Right Side: Content */}
              <div className="md:w-1/2 overflow-y-auto p-8 md:p-12 space-y-8 custom-scrollbar">
                <div className="flex justify-between items-start">
                  <Motion.div
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
                  </Motion.div>
                  <button aria-label="Close project"
                    onClick={() => onClose()}
                    className="hover:rotate-90 transition-transform p-2"
                  >
                    <X size={24} />
                  </button>
                </div>

                <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="space-y-4">
                  <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest opacity-50">
                    <Layers size={16} /> Overview
                  </h4>
                  <p className="leading-relaxed opacity-80">{currentProject.fullDescription}</p>
                </Motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="space-y-4">
                    <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest opacity-50">
                      <CheckCircle2 size={16} /> Features
                    </h4>
                    <ul className="space-y-2">
                      {currentProject.features.map((f, i) => (
                        <li key={i} className="text-sm flex items-center gap-2 opacity-80">
                          <div className="w-1 h-1 rounded-full bg-blue-500" /> {f}
                        </li>
                      ))}
                    </ul>
                  </Motion.div>

                  <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="space-y-4">
                    <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest opacity-50">
                      <Code2 size={16} /> Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {currentProject.technologies.map(t => (
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
                  </Motion.div>
                </div>

                <Motion.div
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
                </Motion.div>
              </div>
            </Motion.div>
          </Motion.div>
        )}
      </AnimatePresence>
  );
}
