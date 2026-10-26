import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import DecodedImage from "../motion/DecodedImage";
import { useIsPresent } from "framer-motion";

// One presentation for the desktop stage and directly available mobile cards.
export default function ProjectArchiveEntry({ project, initial = false, preview = false, onImageReady }) {
  const present = useIsPresent();
  return <article className={`archive-entry${preview ? " is-preview" : ""}`} aria-hidden={!present || undefined} inert={!present}>
    <Link to={`/projects/${project.slug}`} className="archive-image" aria-label={`Explore ${project.title} project`}>
      <DecodedImage reveal={!preview} src={project.image} alt={`${project.title} project interface`}
        sizes="(min-width: 1400px) 660px, (min-width: 1100px) 52vw, (min-width: 768px) 46vw, calc(100vw - 40px)"
        loading={initial || preview ? "eager" : "lazy"} fetchPriority={initial ? "high" : undefined}
        onImageReady={onImageReady} />
    </Link>
    <div className="archive-entry-copy">
      <h3><Link to={`/projects/${project.slug}`}>{project.title}</Link></h3>
      <p className="archive-summary">{project.description}</p>
      <ul className="archive-technologies" aria-label={`${project.title} technologies`}>
        {project.technologies.map(technology => <li key={technology}>{technology}</li>)}
      </ul>
      <div className="archive-actions">
        <Link className="archive-full-link" to={`/projects/${project.slug}`} aria-label={`View Full Project: ${project.title}`}>View Full Project <ArrowUpRight size={16} aria-hidden="true" /></Link>
        <div className="archive-external-links">
          {project.live && <a href={project.live} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} live demo (opens in a new tab)`}>Live Demo <ArrowUpRight size={14} aria-hidden="true" /></a>}
          {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} source code (opens in a new tab)`}>Source <ArrowUpRight size={14} aria-hidden="true" /></a>}
        </div>
      </div>
    </div>
  </article>;
}
