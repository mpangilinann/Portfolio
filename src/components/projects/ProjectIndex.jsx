import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export default function ProjectIndex({ projects, selectedId, onSelect }) {
  return <ol className="archive-index" aria-label="Project index">
    {projects.map((project, index) => <li key={project.id} className={selectedId === project.id ? "is-selected" : ""}>
      <button type="button" aria-label={`Preview ${project.title}`} aria-pressed={selectedId === project.id}
        aria-controls="project-preview" onClick={() => onSelect(project.id)}>
        <span className="archive-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
        <span className="archive-index-description"><span className="archive-index-name">{project.title}</span>
          <span className="archive-index-tech">{project.technologies.slice(0, 3).join(" · ")}</span>
        </span>
        <span className="archive-select-label">Preview<span aria-hidden="true"> ↗</span></span>
      </button>
      <Link className="archive-index-link" to={`/projects/${project.slug}`} aria-label={`View Project: ${project.title}`}>View Project <ArrowUpRight size={14} aria-hidden="true" /></Link>
    </li>)}
  </ol>;
}
