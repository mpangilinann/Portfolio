import { useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import PageMetadata from "../components/PageMetadata";
import ProjectDialog from "../components/ProjectDialog";
import AvailabilityIndicator from "../components/AvailabilityIndicator";
import FeaturedProjectCard from "../components/home/FeaturedProjectCard";
import CodeInterfaceStudio from "../components/home/CodeInterfaceStudio";
import Approach from "../components/home/Approach";
import TechnologyGrid from "../components/home/TechnologyGrid";
import SectionNavigator from "../components/home/SectionNavigator";
import usePointerSurface from "../hooks/usePointerSurface";
import { ActionLink, SectionHeading } from "../components/home/Primitives";
import Reveal from "../components/home/HomeReveal";
import "../styles/home-motion.css";
import { projects } from "../data/projects";
import { profile } from "../data/profile";
import { socialLinks } from "../data/socialLinks";
import { aboutPreview, homeLocation } from "../data/home";
import { motionTiming } from "../utils/motion";

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
      <div className="hero-content">
        <Reveal entrance preset="fade"><AvailabilityIndicator /></Reveal>
        <Reveal as="h1" id="page-heading" entrance preset="mask" delay={motionTiming.stagger}>Mikko Pangilinan</Reveal>
        <Reveal as="p" className="hero-role" entrance delay={2 * motionTiming.stagger}>{profile.title}</Reveal>
        <Reveal as="p" className="hero-statement" entrance preset="soft" delay={3 * motionTiming.stagger}>{profile.homeSupportingText}</Reveal>
        <Reveal as="p" className="hero-location" entrance preset="fade" delay={4 * motionTiming.stagger}><MapPin size={15} aria-hidden="true" />{homeLocation}</Reveal>
        <Reveal className="hero-actions" entrance preset="fade" delay={5 * motionTiming.stagger}><ActionLink href="#selected-work" primary>Explore My Work</ActionLink><ActionLink to="/contact">Contact Me</ActionLink></Reveal>
      </div>
      <Reveal className="hero-studio" entrance preset="studio" delay={6 * motionTiming.stagger}><CodeInterfaceStudio /></Reveal>
    </section>
    <section id="about-preview" tabIndex={-1} className="about-preview soft-section soft-container" aria-labelledby="about-preview-heading"><div className="about-preview-content"><Reveal preset="left"><SectionHeading id="about-preview-heading" title="A little about me" /></Reveal><Reveal preset="right" delay={motionTiming.stagger}><p>{aboutPreview}</p><Link to="/about" className="soft-text-link">More about me <ArrowUpRight size={16} aria-hidden="true" /></Link></Reveal></div></section>
    <section id="selected-work" tabIndex={-1} className="soft-section soft-container" aria-labelledby="projects-heading">
      <Reveal className="work-heading"><SectionHeading id="projects-heading" title="Selected work" /><Link to="/projects" className="soft-text-link">Explore all projects <ArrowRight size={17} aria-hidden="true" /></Link></Reveal>
      <div className="featured-grid">{featured.map((project, index) => <FeaturedProjectCard key={project.id} project={project} index={index} onOpen={openProject} />)}</div>
    </section>
    <section id="my-approach" tabIndex={-1} className="soft-section soft-container" aria-labelledby="approach-heading"><Reveal><SectionHeading id="approach-heading" title="My Approach" /></Reveal><Approach /></section>
    <section id="tools" tabIndex={-1} className="soft-section soft-container tools-section" aria-labelledby="tools-heading"><Reveal className="work-heading"><SectionHeading id="tools-heading" title="Tools I Use" /><Link to="/resume" className="soft-text-link">View résumé <ArrowUpRight size={16} aria-hidden="true" /></Link></Reveal><TechnologyGrid /></section>
    <section id="home-contact" tabIndex={-1} className="closing-section soft-container" aria-labelledby="closing-heading"><div className="closing-panel">
      <div><Reveal preset="fade"><AvailabilityIndicator /></Reveal><Reveal as="h2" preset="mask" id="closing-heading">Have a project or opportunity in mind?</Reveal><Reveal as="p" preset="fade" delay={motionTiming.stagger}>I’m open to internships, junior opportunities, and collaborative web projects.</Reveal></div>
      <Reveal className="closing-controls" preset="fade" delay={2 * motionTiming.stagger}><ActionLink to="/contact" primary>Contact Me</ActionLink><div className="closing-socials">{socialLinks.filter(link => ["GitHub", "LinkedIn"].includes(link.label)).map(link => <a className="soft-text-link" key={link.label} href={link.url} target="_blank" rel="noopener noreferrer" aria-label={`${link.label} (opens in a new tab)`}>{link.label}<ArrowUpRight size={15} aria-hidden="true" /></a>)}</div></Reveal>
    </div></section>
    <ProjectDialog currentProject={projects.find(project => project.id === selectedProject)} onClose={closeProject} returnFocusRef={openerRef} />
  </div>;
}
