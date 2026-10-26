import { Link } from "react-router-dom";
import { ArrowUpRight, MapPin } from "lucide-react";
import PageMetadata from "../components/PageMetadata";
import { Reveal } from "../components/home/Primitives";
import AvailabilityIndicator from "../components/AvailabilityIndicator";
import ResumeActions from "../components/resume/ResumeActions";
import ResumeExperience from "../components/resume/ResumeExperience";
import ResumeSkills from "../components/resume/ResumeSkills";
import { projects } from "../data/projects";
import { certifications } from "../data/certifications";
import { profile } from "../data/profile";
import { contact } from "../data/contact";
import { revealTiming } from "../utils/revealMotion";
import { motionTiming } from "../utils/motion";
import "../styles/resume.css";

// Resume-only selection; preserve catalog order and leave other routes untouched.
const resumeProjectSlugs = new Set(["ac-core", "flashify", "thryve"]);
const resumeProjects = projects.filter(project => resumeProjectSlugs.has(project.slug));

export default function Resume() {
  return <div className="resume-page"><PageMetadata />
    <div className="resume-container">
      <header className="resume-introduction">
        <div className="resume-header-layout"><div>
          <Reveal as="p" className="resume-small-label" entrance preset="fade">R&eacute;sum&eacute;</Reveal>
          <Reveal as="h1" id="page-heading" entrance preset="mask" delay={motionTiming.stagger}>{profile.name}</Reveal>
          <Reveal as="p" className="resume-role" entrance preset="soft" delay={2 * motionTiming.stagger}>{profile.title}</Reveal>
          <Reveal as="p" className="resume-location" entrance preset="fade" delay={3 * motionTiming.stagger}><MapPin size={16} aria-hidden="true" />{contact.location}</Reveal>
          <AvailabilityIndicator />
        </div><ResumeActions entrance delay={3 * motionTiming.stagger} /></div>
      </header>
      <div className="resume-content">
        <section aria-labelledby="resume-summary"><div>
          <Reveal as="h2" preset="mask" id="resume-summary">Professional Summary</Reveal>
          <Reveal as="p" className="resume-summary-text" preset="document" delay={motionTiming.stagger}>{profile.resumeSummary}</Reveal>
        </div></section>
        <section aria-labelledby="resume-experience"><div>
          <Reveal as="h2" preset="mask" id="resume-experience">Experience</Reveal><ResumeExperience />
        </div></section>
        <div className="resume-background">
          <section aria-labelledby="resume-education"><div>
            <Reveal as="h2" preset="mask" id="resume-education">Education</Reveal>
            <Reveal as="article" className="resume-education" preset="document" delay={motionTiming.stagger}><h3>{profile.education.degree}</h3><p>{profile.education.institution}</p>
              <Reveal as="dl" preset="fade" delay={2 * motionTiming.stagger}>
                {profile.education.expectedGraduation && <div><dt>Expected Graduation</dt><dd>{profile.education.expectedGraduation}</dd></div>}
                {profile.education.honors && <div><dt>Academic Honors</dt><dd>{profile.education.honors}</dd></div>}
              </Reveal>
            </Reveal>
          </div></section>
          <section aria-labelledby="resume-projects"><div>
            <Reveal as="h2" preset="mask" id="resume-projects">Selected Project Experience</Reveal>
            <Link to="/projects" className="resume-all-projects">View all projects</Link>
            <ul className="resume-project-work">{resumeProjects.map((project, index) => <Reveal as="li" key={project.id} preset="document" delay={index * motionTiming.stagger}>
              <h3>{project.title}</h3>
              <p>{project.resumeDescription}</p><p className="resume-project-technologies"><strong>Technologies:</strong> {project.resumeTechnologies}</p>
            </Reveal>)}</ul>
          </div></section>
        </div>
        <section aria-labelledby="resume-skills"><div>
          <Reveal as="h2" preset="mask" id="resume-skills">Skills</Reveal><ResumeSkills />
        </div></section>
        <section aria-labelledby="resume-certifications"><div>
          <Reveal as="h2" preset="mask" id="resume-certifications">Certifications</Reveal>
          <ul className="resume-certifications">{certifications.map((certification, index) => <Reveal as="li" key={certification.title} preset="fade" delay={Math.floor(index / 3) * revealTiming.itemStagger}>
            <a href={certification.link} target="_blank" rel="noopener noreferrer" aria-label={`${certification.title} credential (opens in a new tab)`}><span>{certification.title}</span><ArrowUpRight size={16} aria-hidden="true" /></a>
          </Reveal>)}</ul>
        </div></section>
      </div>
      <section className="resume-closing" aria-labelledby="resume-closing-heading">
        <Reveal as="h2" preset="mask" id="resume-closing-heading">Let's talk about an opportunity.</Reveal>
        <ResumeActions includeDownload={false} delay={motionTiming.stagger} />
      </section>
    </div>
  </div>;
}
