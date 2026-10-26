import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { projects } from "../data/projects";
import { getProjectDetails } from "../utils/projectDetail";
import PageMetadata from "../components/PageMetadata";
import DecodedImage from "../components/motion/DecodedImage";
import ProjectNavigation from "../components/projects/ProjectNavigation";
import { Reveal } from "../components/home/Primitives";
import NotFound from "./NotFound";
import { motionTiming } from "../utils/motion";
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
      <div className="case-header">
        <div><Reveal as="p" className="case-position" entrance preset="fade">Project {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</Reveal>
          <Reveal as="h1" id="page-heading" entrance preset="mask" delay={motionTiming.stagger} className={project.title.length > 13 ? "is-long-title" : undefined}>{project.title}</Reveal>
          <Reveal as="p" className="case-summary" entrance preset="soft" delay={2 * motionTiming.stagger}>{project.description}</Reveal>
        </div>
        <Reveal className="case-header-aside" entrance preset="rise" delay={3 * motionTiming.stagger}>
          {project.role && <div><p className="case-kicker">Role</p><p className="case-header-role">{project.role}</p></div>}
          <div className="case-actions">
            {project.live && <a href={project.live} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} live demo (opens in a new tab)`} className="soft-button is-primary">Live Demo <ExternalLink size={15} aria-hidden="true" /></a>}
            {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} source code on GitHub (opens in a new tab)`} className="soft-button">Source <Github size={15} aria-hidden="true" /></a>}
          </div>
        </Reveal>
      </div>
      <div><figure className="case-media">
        <DecodedImage entrance delay={4 * motionTiming.stagger} src={project.image} alt={`${project.title} project interface`} sizes="(min-width: 1040px) 960px, (min-width: 768px) calc(100vw - 80px), calc(100vw - 40px)" loading="eager" fetchPriority="high" />
      </figure></div>

      <div className="case-information">
        <Reveal preset="document"><dl className="case-facts" aria-label="Project information">
          {project.role && <div><dt>Role</dt><dd>{project.role}</dd></div>}
          {details.type && <div><dt>Project type</dt><dd>{details.type}</dd></div>}
          {details.status && <div><dt>Status</dt><dd>{details.status}</dd></div>}
          {technologies.length > 0 && <div className="case-tech-fact"><dt>Technologies</dt><dd><ul className="case-technologies">{technologies.map(technology => <li key={technology}>{technology}</li>)}</ul></dd></div>}
          {details.targetUsers.length > 0 && <div><dt>Target users</dt><dd>{details.targetUsers.join(", ")}</dd></div>}
          {details.teamContext && <div><dt>Team context</dt><dd>{details.teamContext}</dd></div>}
        </dl></Reveal>
        <div className="case-copy">
          {project.fullDescription && <div><section aria-labelledby="project-overview"><Reveal as="h2" preset="mask" id="project-overview">Overview</Reveal><Reveal as="p" className="case-overview" preset="soft" delay={motionTiming.stagger}>{project.fullDescription}</Reveal></section></div>}
          {project.features?.length > 0 && <div className="case-features"><section aria-labelledby="project-features"><Reveal as="h2" preset="mask" id="project-features">Key features</Reveal>
            <ol className="case-feature-grid">{project.features.map((feature, i) => <Reveal as="li" key={feature} preset="fade" delay={(Math.min(Math.floor(i / 2), 2) + 1) * motionTiming.stagger}><span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span><span>{feature}</span></Reveal>)}</ol>
          </section></div>}
        </div>
      </div>
      {details.sections.length > 0 && <div className="case-extra">{details.sections.map(section => <div key={section.id} className={section.id === "contributions" ? "is-contributions" : ""}>
        <section aria-labelledby={`project-${section.id}`}><Reveal as="h2" preset="mask" id={`project-${section.id}`}>{section.title}</Reveal><Reveal as="ul" preset="fade" delay={motionTiming.stagger}>{section.items.map(item => <li key={item}>{item}</li>)}</Reveal></section>
      </div>)}</div>}
      {details.gallery.length > 0 && <div className="case-gallery"><section aria-labelledby="project-gallery"><Reveal as="h2" preset="mask" id="project-gallery">Gallery</Reveal>
        <div className="case-gallery-grid">{details.gallery.map(image => <figure key={image.src}>
          <DecodedImage src={image.src} alt={image.alt} sizes="(min-width: 1200px) 548px, (min-width: 768px) 45vw, calc(100vw - 40px)" />
          {typeof image.caption === "string" && image.caption.trim() && <figcaption>{image.caption}</figcaption>}
        </figure>)}</div>
      </section></div>}
      <ProjectNavigation previous={projects[index - 1]} next={projects[index + 1]} />
    </div>
  </article>;
}
