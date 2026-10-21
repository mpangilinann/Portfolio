import { useRef } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, X, User, Code2, Layers, CheckCircle2 } from "lucide-react";
import useModalFocus from "../hooks/useModalFocus";
import useReducedMotion from "../hooks/useReducedMotion";

export default function ProjectDialog({ currentProject, onClose, returnFocusRef }) {
  return createPortal(
    <AnimatePresence>
      {currentProject && <ProjectDialogContent key={currentProject.id} currentProject={currentProject} onClose={onClose} returnFocusRef={returnFocusRef} />}
    </AnimatePresence>, document.body
  );
}

function ProjectDialogContent({ currentProject, onClose, returnFocusRef }) {
  const panelRef = useRef(null);
  const closeRef = useRef(null);
  const reducedMotion = useReducedMotion();
  useModalFocus({ active: true, panelRef, initialFocusRef: closeRef, returnFocusRef, onClose });
  return (
          <Motion.div
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reducedMotion ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0 }}
            data-modal-root
            transition={reducedMotion ? { duration: 0 } : undefined}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center p-4"
            onClick={() => onClose()}
          >
            <Motion.div
              initial={reducedMotion ? false : { scale: 0.9, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={reducedMotion ? { opacity: 0, transition: { duration: 0 } } : { scale: 0.9, y: 50, opacity: 0 }}
              ref={panelRef}
              tabIndex={-1}
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-dialog-title"
              aria-describedby="project-dialog-overview"
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
                  alt={`${currentProject.title} project interface`}
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
                  <Motion.div
                    initial={reducedMotion ? false : { x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={reducedMotion ? { duration: 0, delay: 0 } : { delay: 0.2 }}
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
                    initial={reducedMotion ? false : { y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={reducedMotion ? { duration: 0, delay: 0 } : { delay: 0.3 }}
                    className="space-y-1"
                  >
                    <p className="text-xs uppercase tracking-widest opacity-60 font-bold">Role</p>
                    <div className="flex items-center gap-2 text-xl font-bold italic">
                      <User aria-hidden="true" size={20} className="text-blue-500" />
                      {currentProject.role}
                    </div>
                  </Motion.div>
                  <button ref={closeRef} aria-label="Close project"
                    onClick={() => onClose()}
                    className="motion-safe:hover:rotate-90 transition-transform min-h-11 min-w-11 p-2"
                  >
                    <X aria-hidden="true" size={24} />
                  </button>
                </div>

                <Motion.div initial={reducedMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={reducedMotion ? { duration: 0, delay: 0 } : { delay: 0.4 }} className="space-y-4">
                  <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest opacity-60">
                    <Layers aria-hidden="true" size={16} /> Overview
                  </h3>
                  <p id="project-dialog-overview" className="leading-relaxed opacity-80">{currentProject.fullDescription}</p>
                </Motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <Motion.div initial={reducedMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={reducedMotion ? { duration: 0, delay: 0 } : { delay: 0.5 }} className="space-y-4">
                    <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest opacity-60">
                      <CheckCircle2 aria-hidden="true" size={16} /> Features
                    </h3>
                    <ul className="space-y-2">
                      {currentProject.features.map((f, i) => (
                        <li key={i} className="text-sm flex items-center gap-2 opacity-80">
                          <div className="w-1 h-1 rounded-full bg-blue-500" /> {f}
                        </li>
                      ))}
                    </ul>
                  </Motion.div>

                  <Motion.div initial={reducedMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={reducedMotion ? { duration: 0, delay: 0 } : { delay: 0.6 }} className="space-y-4">
                    <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest opacity-60">
                      <Code2 aria-hidden="true" size={16} /> Tech Stack
                    </h3>
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

                <Link
                  to={`/projects/${currentProject.slug}`}
                  onClick={onClose}
                  aria-label={`View Full Project: ${currentProject.title}`}
                  className="flex items-center justify-between gap-4 border-b py-4 font-bold min-h-11"
                  style={{ borderColor: "var(--card-border)" }}
                >
                  View Full Project <ExternalLink aria-hidden="true" size={18} />
                </Link>
                <Motion.div
                  initial={reducedMotion ? false : { y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={reducedMotion ? { duration: 0, delay: 0 } : { delay: 0.7 }}
                  className="flex flex-col sm:flex-row gap-4 pt-6"
                >
                  <a
                    href={currentProject.live}
                    aria-label={`View ${currentProject.title} live demo (opens in a new tab)`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-4 text-center rounded-xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all hover:opacity-80 shadow-md"
                    style={{
                      backgroundColor: "var(--text-color)",
                      color: "var(--bg-color)"
                    }}
                  >
                    <ExternalLink aria-hidden="true" size={16} /> Live Demo
                  </a>
                  <a
                    href={currentProject.github}
                    aria-label={`View ${currentProject.title} source code on GitHub (opens in a new tab)`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-4 border text-center rounded-xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white hover:text-black transition-all"
                    style={{
                      borderColor: "var(--text-color)",
                      color: "var(--text-color)"
                    }}
                  >
                    <Github aria-hidden="true" size={16} /> Source
                  </a>
                </Motion.div>
              </div>
            </Motion.div>
          </Motion.div>
  );
}
