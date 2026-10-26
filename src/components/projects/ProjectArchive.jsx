import { useRef, useState, useSyncExternalStore } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { projects } from "../../data/projects";
import useReducedMotion from "../../hooks/useReducedMotion";
import ProjectIndex from "./ProjectIndex";
import ProjectArchiveEntry from "./ProjectArchiveEntry";
import usePreviewHeight from "./usePreviewHeight";
import Reveal from "../motion/Reveal";
import { revealTiming } from "../../utils/revealMotion";
import { motionEase, motionTiming } from "../../utils/motion";

const desktopQuery = "(min-width: 1100px)";
const subscribeLayout = callback => {
  const media = window.matchMedia(desktopQuery);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
};

export default function ProjectArchive() {
  const [selectedId, setSelectedId] = useState(projects[0]?.id);
  const [previewId, setPreviewId] = useState(projects[0]?.id);
  const latestSelection = useRef(projects[0]?.id);
  const desktop = useSyncExternalStore(subscribeLayout, () => window.matchMedia(desktopQuery).matches, () => false);
  const stageRef = usePreviewHeight(desktop);
  const reduced = useReducedMotion();
  const selectProject = id => { latestSelection.current = id; setSelectedId(id); };
  const previews = projects.filter(project => project.id === previewId || project.id === selectedId);

  return <section className="archive-directory" aria-labelledby="archive-directory-heading">
    <Reveal className="archive-directory-heading" preset="fade" delay={3 * motionTiming.stagger}><h2 id="archive-directory-heading">Project archive</h2>
      {desktop && <p>Choose a project to preview. Open its full page for details.</p>}
    </Reveal>
    {desktop ? <div className="archive-desktop">
      <ProjectIndex projects={projects} selectedId={selectedId} onSelect={selectProject} />
      <Reveal ref={stageRef} preset="fade" delay={4 * motionTiming.stagger} className="archive-stage" id="project-preview" role="region" aria-label="Selected project preview" aria-busy={previewId !== selectedId}>
        <AnimatePresence initial={false} mode="popLayout">
          {previews.map(project => <Motion.div key={project.id} initial={reduced ? false : { opacity: 0, scale: 1.02 }} animate={{ opacity: project.id === previewId ? 1 : 0, scale: project.id === previewId ? 1 : 1.02 }}
            inert={project.id !== previewId} aria-hidden={project.id !== previewId || undefined}
            style={{ position: project.id === previewId ? "relative" : "absolute", inset: 0 }}
            exit={{ opacity: 0, transition: { duration: reduced ? 0 : revealTiming.crossfade } }} transition={{ duration: reduced ? 0 : revealTiming.crossfade, ease: motionEase }}>
            <ProjectArchiveEntry project={project} initial={project.id === projects[0].id} preview
              onImageReady={() => { if (latestSelection.current === project.id) setPreviewId(project.id); }} />
          </Motion.div>)}
        </AnimatePresence>
      </Reveal>
    </div> : <ol className="archive-cards" aria-label="Projects">
      {projects.map((project, index) => <Reveal as="li" key={project.id} preset="rise" delay={(index % 2) * motionTiming.stagger}><ProjectArchiveEntry project={project} initial={index === 0} /></Reveal>)}
    </ol>}
  </section>;
}
