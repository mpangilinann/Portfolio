import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import OptimizedImage from "../OptimizedImage";
import { useRef, useState } from "react";
import HomeReveal from "./HomeReveal";
import { motionTiming } from "../../utils/motion";

export default function FeaturedProjectCard({ project, onOpen, index = 0 }) {
  const [ready, setReady] = useState(false);
  const mounted = useRef(null);
  const imageReady = event => {
    const image = event.currentTarget;
    image.decode().catch(() => {}).then(() => { if (mounted.current) setReady(true); });
  };
  return <HomeReveal as="article" className="featured-card" delay={(index + 1) * motionTiming.stagger}>
    <Link ref={mounted} className="featured-image" to={`/projects/${project.slug}`} aria-label={`Explore ${project.title} project`}><HomeReveal className="home-image-reveal" preset="imageMask" ready={ready}><OptimizedImage src={project.image} alt={`${project.title} project interface`} sizes="(min-width: 1280px) 600px, (min-width: 900px) 45vw, 100vw" loading="lazy" onLoad={imageReady} onError={() => setReady(true)} /></HomeReveal><ArrowUpRight size={20} className="image-arrow" aria-hidden="true" /></Link>
    <div className="featured-content"><h3>{project.title}</h3><p>{project.description}</p><p className="featured-technologies">{(project.featuredTechnologies ?? project.technologies).join(" · ")}</p>
      <div className="featured-actions"><button type="button" className="soft-text-link" aria-haspopup="dialog" aria-label={`View ${project.title} project`} onClick={event => onOpen(project, event.currentTarget)}>View project <ArrowUpRight size={17} aria-hidden="true" /></button><Link className="soft-text-link" to={`/projects/${project.slug}`} aria-label={`Full details: ${project.title}`}>Full details <ArrowRight size={16} aria-hidden="true" /></Link></div>
      <div className="project-external-links">{project.live && <a href={project.live} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} live demo (opens in a new tab)`}>Live Demo <ArrowUpRight size={13} aria-hidden="true" /></a>}{project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} source code (opens in a new tab)`}>Source <ArrowUpRight size={13} aria-hidden="true" /></a>}</div>
    </div>
  </HomeReveal>;
}
