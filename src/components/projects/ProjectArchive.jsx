import { useState, useSyncExternalStore } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { projects } from "../../data/projects";
import useReducedMotion from "../../hooks/useReducedMotion";
import ProjectIndex from "./ProjectIndex";
import ProjectArchiveEntry from "./ProjectArchiveEntry";

const desktopQuery = "(min-width: 1100px)";
const subscribeLayout = callback => {
  const media = window.matchMedia(desktopQuery);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
};

export default function ProjectArchive() {
  const [selectedId, setSelectedId] = useState(projects[0]?.id);
  const desktop = useSyncExternalStore(subscribeLayout, () => window.matchMedia(desktopQuery).matches, () => false);
  const reduced = useReducedMotion();
  const selected = projects.find(project => project.id === selectedId);

  return <section className="archive-directory" aria-labelledby="archive-directory-heading">
    <div className="archive-directory-heading"><h2 id="archive-directory-heading">Project archive</h2>
      {desktop && <p>Choose a project to preview. Open its full page for details.</p>}
    </div>
    {desktop ? <div className="archive-desktop">
      <ProjectIndex projects={projects} selectedId={selectedId} onSelect={setSelectedId} />
      <div className="archive-stage" id="project-preview" role="region" aria-label="Selected project preview">
        <AnimatePresence initial={false} mode="popLayout">
          <Motion.div key={selected.id} initial={reduced ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: reduced ? 0 : .12 } }} transition={{ duration: reduced ? 0 : .2 }}>
            <ProjectArchiveEntry project={selected} initial={selected.id === projects[0].id} preview />
          </Motion.div>
        </AnimatePresence>
      </div>
    </div> : <ol className="archive-cards" aria-label="Projects">
      {projects.map((project, index) => <li key={project.id}><ProjectArchiveEntry project={project} initial={index === 0} /></li>)}
    </ol>}
  </section>;
}
