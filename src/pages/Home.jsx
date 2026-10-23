import { useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import PageMetadata from "../components/PageMetadata";
import ProjectDialog from "../components/ProjectDialog";
import AvailabilityIndicator from "../components/AvailabilityIndicator";
import FeaturedProjectCard from "../components/home/FeaturedProjectCard";
import DeveloperSnapshot from "../components/home/DeveloperSnapshot";
import Approach from "../components/home/Approach";
import TechnologyGrid from "../components/home/TechnologyGrid";
import SectionNavigator from "../components/home/SectionNavigator";
import usePointerSurface from "../hooks/usePointerSurface";
import { ActionLink, SectionHeading, Reveal } from "../components/home/Primitives";
import { projects } from "../data/projects";
import { profile } from "../data/profile";
import { socialLinks } from "../data/socialLinks";
import { aboutPreview, homeLocation } from "../data/home";

const featured = projects.filter(project => ["ac-core", "flashify"].includes(project.slug));

export default function Home() {
  const ambient = usePointerSurface();
  const [selectedProject, setSelectedProject] = useState(null);
  const openerRef = useRef(null);
  const closeProject = useCallback(() => setSelectedProject(null), []);
  const openProject = (project, trigger) => {
    openerRef.current = trigger;
    setSelectedProject(project.id);
  };
  return <div className="soft-home">
    <PageMetadata />
    <SectionNavigator />
    <section id="intro" tabIndex={-1} className="home-hero soft-container ambient-surface" aria-labelledby="page-heading" {...ambient}>
      <Reveal className="hero-content">
        <AvailabilityIndicator />
        <h1 id="page-heading">Mikko Pangilinan</h1>
        <p className="hero-role">{profile.title}</p>
        <p className="hero-statement">{profile.homeSupportingText}</p>
        <p className="hero-location"><MapPin size={15} aria-hidden="true" />{homeLocation}</p>
        <div className="hero-actions"><ActionLink href="#selected-work" primary>Explore My Work</ActionLink><ActionLink to="/contact">Contact Me</ActionLink></div>
      </Reveal>
      <Reveal className="hero-snapshot"><DeveloperSnapshot /></Reveal>
    </section>
    <section id="about-preview" tabIndex={-1} className="about-preview soft-section soft-container" aria-labelledby="about-preview-heading"><Reveal className="about-preview-content"><SectionHeading id="about-preview-heading" title="A little about me" /><div><p>{aboutPreview}</p><Link to="/about" className="soft-text-link">More about me <ArrowUpRight size={16} aria-hidden="true" /></Link></div></Reveal></section>
    <section id="selected-work" tabIndex={-1} className="soft-section soft-container" aria-labelledby="projects-heading">
      <Reveal><div className="work-heading"><SectionHeading id="projects-heading" title="Selected work" /><Link to="/projects" className="soft-text-link">Explore all projects <ArrowRight size={17} aria-hidden="true" /></Link></div>
        <div className="featured-grid">{featured.map(project => <FeaturedProjectCard key={project.id} project={project} onOpen={openProject} />)}</div>
      </Reveal>
    </section>
    <section id="my-approach" tabIndex={-1} className="soft-section soft-container" aria-labelledby="approach-heading"><Reveal><SectionHeading id="approach-heading" title="My Approach" /><Approach /></Reveal></section>
    <section id="tools" tabIndex={-1} className="soft-section soft-container tools-section" aria-labelledby="tools-heading"><Reveal><div className="work-heading"><SectionHeading id="tools-heading" title="Tools I Use" /><Link to="/resume" className="soft-text-link">View résumé <ArrowUpRight size={16} aria-hidden="true" /></Link></div><TechnologyGrid /></Reveal></section>
    <section id="home-contact" tabIndex={-1} className="closing-section soft-container" aria-labelledby="closing-heading"><Reveal className="closing-panel">
      <div><AvailabilityIndicator /><h2 id="closing-heading">Have a project or opportunity in mind?</h2><p>I’m open to internships, junior opportunities, and collaborative web projects.</p></div>
      <div className="closing-controls"><ActionLink to="/contact" primary>Contact Me</ActionLink><div className="closing-socials">{socialLinks.filter(link => ["GitHub", "LinkedIn"].includes(link.label)).map(link => <a className="soft-text-link" key={link.label} href={link.url} target="_blank" rel="noopener noreferrer" aria-label={`${link.label} (opens in a new tab)`}>{link.label}<ArrowUpRight size={15} aria-hidden="true" /></a>)}</div></div>
    </Reveal></section>
    <ProjectDialog currentProject={projects.find(project => project.id === selectedProject)} onClose={closeProject} returnFocusRef={openerRef} />
  </div>;
}
