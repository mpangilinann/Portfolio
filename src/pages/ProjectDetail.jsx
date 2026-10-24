import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { projects } from "../data/projects";
import { getProjectDetails } from "../utils/projectDetail";
import PageMetadata from "../components/PageMetadata";
import OptimizedImage from "../components/OptimizedImage";
import ProjectNavigation from "../components/projects/ProjectNavigation";
import { Reveal } from "../components/home/Primitives";
import NotFound from "./NotFound";
import "../styles/project-detail.css";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find(project => project.slug === slug);
  if (!project) return <NotFound />;
  return <ProjectContent key={project.slug} project={project} />;
}

function ProjectContent({ project }) {
  const index = projects.indexOf(project);
  const technologies = project.technologies ?? [];
  const details = getProjectDetails(project);

  return <article className="case-page">
    <PageMetadata />
    <div className="case-container">
      <Link to="/projects" className="case-breadcrumb"><ArrowLeft size={14} aria-hidden="true" /> All projects</Link>
      <Reveal className="case-header">
        <div><p className="case-position">Project {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</p>
          <h1 id="page-heading" className={project.title.length > 13 ? "is-long-title" : undefined}>{project.title}</h1>
          <p className="case-summary">{project.description}</p>
        </div>
        <div className="case-header-aside">
          {project.role && <div><p className="case-kicker">Role</p><p className="case-header-role">{project.role}</p></div>}
          <div className="case-actions">
            {project.live && <a href={project.live} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} live demo (opens in a new tab)`} className="soft-button is-primary">Live Demo <ExternalLink size={15} aria-hidden="true" /></a>}
            {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} source code on GitHub (opens in a new tab)`} className="soft-button">Source <Github size={15} aria-hidden="true" /></a>}
          </div>
        </div>
      </Reveal>
      <Reveal><figure className="case-media">
        <OptimizedImage src={project.image} alt={`${project.title} project interface`} sizes="(min-width: 1040px) 960px, (min-width: 768px) calc(100vw - 80px), calc(100vw - 40px)" loading="eager" fetchPriority="high" />
      </figure></Reveal>

      <div className="case-information">
        <Reveal><dl className="case-facts" aria-label="Project information">
          {project.role && <div><dt>Role</dt><dd>{project.role}</dd></div>}
          {details.type && <div><dt>Project type</dt><dd>{details.type}</dd></div>}
          {details.status && <div><dt>Status</dt><dd>{details.status}</dd></div>}
          {technologies.length > 0 && <div className="case-tech-fact"><dt>Technologies</dt><dd><ul className="case-technologies">{technologies.map(technology => <li key={technology}>{technology}</li>)}</ul></dd></div>}
          {details.targetUsers.length > 0 && <div><dt>Target users</dt><dd>{details.targetUsers.join(", ")}</dd></div>}
          {details.teamContext && <div><dt>Team context</dt><dd>{details.teamContext}</dd></div>}
        </dl></Reveal>
        <div className="case-copy">
          {project.fullDescription && <Reveal><section aria-labelledby="project-overview"><h2 id="project-overview">Overview</h2><p className="case-overview">{project.fullDescription}</p></section></Reveal>}
          {project.features?.length > 0 && <Reveal className="case-features"><section aria-labelledby="project-features"><h2 id="project-features">Key features</h2>
            <ol className="case-feature-grid">{project.features.map((feature, i) => <li key={feature}><span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span><span>{feature}</span></li>)}</ol>
          </section></Reveal>}
        </div>
      </div>
      {details.sections.length > 0 && <div className="case-extra">{details.sections.map(section => <Reveal key={section.id} className={section.id === "contributions" ? "is-contributions" : ""}>
        <section aria-labelledby={`project-${section.id}`}><h2 id={`project-${section.id}`}>{section.title}</h2><ul>{section.items.map(item => <li key={item}>{item}</li>)}</ul></section>
      </Reveal>)}</div>}
      {details.gallery.length > 0 && <Reveal className="case-gallery"><section aria-labelledby="project-gallery"><h2 id="project-gallery">Gallery</h2>
        <div className="case-gallery-grid">{details.gallery.map(image => <figure key={image.src}>
          <OptimizedImage src={image.src} alt={image.alt} sizes="(min-width: 1200px) 548px, (min-width: 768px) 45vw, calc(100vw - 40px)" />
          {typeof image.caption === "string" && image.caption.trim() && <figcaption>{image.caption}</figcaption>}
        </figure>)}</div>
      </section></Reveal>}
      <ProjectNavigation previous={projects[index - 1]} next={projects[index + 1]} />
    </div>
  </article>;
}
