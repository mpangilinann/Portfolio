import { Link, useParams } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink, Github } from "lucide-react";
import { projects } from "../data/projects";
import PageMetadata from "../components/PageMetadata";
import useReducedMotion from "../hooks/useReducedMotion";
import NotFound from "./NotFound";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find(project => project.slug === slug);
  const reducedMotion = useReducedMotion();
  if (!project) return <NotFound />;
  return <ProjectContent key={project.slug} project={project} reducedMotion={reducedMotion} />;
}

function ProjectContent({ project, reducedMotion }) {
  const index = projects.indexOf(project);
  const previous = projects[index - 1];
  const next = projects[index + 1];
  const technologies = project.technologies ?? [];
  const optionalSections = [
    ["My Contributions", project.contributions],
    ["Challenges", project.challenges],
    ["Lessons Learned", project.lessons],
  ];
  const seenImages = new Set([project.image]);
  const gallery = (project.gallery ?? []).filter(image => {
    if (!image.src || !image.alt || seenImages.has(image.src)) return false;
    seenImages.add(image.src);
    return true;
  });
  const reveal = step => ({
    initial: reducedMotion ? false : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reducedMotion ? 0 : 0.45, delay: reducedMotion ? 0 : step * 0.06 },
  });

  return (
    <article className="project-detail px-6 pt-24 pb-20" style={{ color: "var(--text-color)", backgroundColor: "var(--bg-color)" }}>
      <PageMetadata title={`${project.title} | Mikko Pangilinan`} description={project.description} />
      <div className="mx-auto max-w-7xl">
        <Link to="/projects" className="inline-flex items-center gap-2 min-h-11 text-sm mb-10 rounded-sm">
          <ArrowLeft size={16} aria-hidden="true" /> All projects
        </Link>
        <header>
          <Motion.div {...reveal(0)} className="flex items-center gap-4 border-t pt-5 text-xs uppercase tracking-[0.18em] font-semibold" style={{ borderColor: "var(--card-border)" }}>
            <span>Project {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span>
            {project.type && <span>{project.type}</span>}
          </Motion.div>
          <Motion.h1 {...reveal(1)} id="page-heading" className="my-8 max-w-6xl text-[clamp(2.75rem,7.5vw,7rem)] font-bold tracking-tighter leading-[1.02] break-words">
            {project.title}
          </Motion.h1>
          <Motion.div {...reveal(2)} className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
            <div className="max-w-2xl space-y-5">
              <p className="text-lg md:text-xl leading-relaxed">{project.description}</p>
              <p className="text-sm leading-relaxed">{[project.role, ...technologies.slice(0, 3)].filter(Boolean).join(" / ")}</p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              {project.live && <a href={project.live} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} live demo (opens in a new tab)`} className="detail-action detail-action-primary">
                Live Demo <ExternalLink size={16} aria-hidden="true" />
              </a>}
              {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} source code on GitHub (opens in a new tab)`} className="detail-action">
                GitHub <Github size={16} aria-hidden="true" />
              </a>}
            </div>
          </Motion.div>
        </header>

        <Motion.figure {...reveal(3)} className="overflow-hidden rounded-2xl border" style={{ borderColor: "var(--card-border)", backgroundColor: "var(--section-bg)" }}>
          <img src={project.image} alt={`${project.title} project interface`} className="w-full h-auto block" fetchPriority="high" />
        </Motion.figure>

        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-12 lg:gap-24 mt-12 md:mt-20">
          <Motion.aside {...reveal(4)} aria-label="Project information" className="min-w-0">
            <dl className="detail-information">
              {project.role && <div><dt>Role</dt><dd>{project.role}</dd></div>}
              {project.type && <div><dt>Project type</dt><dd>{project.type}</dd></div>}
              {project.status && <div><dt>Status</dt><dd>{project.status}</dd></div>}
              {technologies.length > 0 && <div><dt>Technologies</dt><dd><ul className="flex flex-wrap gap-2">{technologies.map(tech => <li key={tech} className="border rounded-full px-3 py-1 text-sm break-words max-w-full" style={{ borderColor: "var(--card-border)" }}>{tech}</li>)}</ul></dd></div>}
              {project.targetUsers?.length > 0 && <div><dt>Target users</dt><dd>{project.targetUsers.join(", ")}</dd></div>}
              {project.teamContext && <div><dt>Team context</dt><dd>{project.teamContext}</dd></div>}
            </dl>
          </Motion.aside>
          <div className="min-w-0 space-y-16">
            {project.fullDescription && <section aria-labelledby="project-overview"><h2 id="project-overview" className="detail-heading">Overview</h2><p className="max-w-prose text-lg leading-relaxed">{project.fullDescription}</p></section>}
            {project.features?.length > 0 && <section aria-labelledby="project-features"><h2 id="project-features" className="detail-heading">Key features</h2><ol className="detail-numbered-list">{project.features.map((feature, i) => <li key={feature}><span aria-hidden="true" className="text-xs font-mono pt-1">{String(i + 1).padStart(2, "0")}</span><span>{feature}</span></li>)}</ol></section>}
            {optionalSections.filter(([, items]) => items?.length > 0).map(([title, items]) => <section key={title} aria-label={title}><h2 className="detail-heading">{title}</h2><ul className="list-disc pl-5 space-y-3 leading-relaxed">{items.map(item => <li key={item}>{item}</li>)}</ul></section>)}
          </div>
        </div>

        {gallery.length > 0 && <section aria-labelledby="project-gallery" className="mt-20"><h2 id="project-gallery" className="detail-heading">Gallery</h2><div className="space-y-8">{gallery.map(image => <figure key={image.src}><img src={image.src} alt={image.alt} loading="lazy" className="w-full h-auto rounded-2xl border" style={{ borderColor: "var(--card-border)" }} />{image.caption && <figcaption className="mt-3 text-sm">{image.caption}</figcaption>}</figure>)}</div></section>}

        <nav aria-label="Project navigation" className="mt-24 border-t pt-8" style={{ borderColor: "var(--card-border)" }}>
          <div className="grid sm:grid-cols-2 gap-8">
            {previous && <Link to={`/projects/${previous.slug}`} className="detail-project-link"><span className="text-xs uppercase tracking-widest flex items-center gap-2"><ArrowLeft size={16} aria-hidden="true" /> Previous project</span><span className="text-xl md:text-2xl font-semibold">{previous.title}</span></Link>}
            {next && <Link to={`/projects/${next.slug}`} className="detail-project-link sm:col-start-2 sm:text-right sm:items-end"><span className="text-xs uppercase tracking-widest flex items-center gap-2">Next project <ArrowRight size={16} aria-hidden="true" /></span><span className="text-xl md:text-2xl font-semibold">{next.title}</span></Link>}
          </div>
          <Link to="/projects" className="inline-flex items-center gap-2 min-h-11 mt-8 text-sm underline underline-offset-4">Back to all projects</Link>
        </nav>
      </div>
    </article>
  );
}
