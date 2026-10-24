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
import "../styles/resume.css";

// Resume-only selection; preserve catalog order and leave other routes untouched.
const resumeProjectSlugs = new Set(["ac-core", "flashify", "thryve"]);
const resumeProjects = projects.filter(project => resumeProjectSlugs.has(project.slug));

export default function Resume() {
  return <div className="resume-page"><PageMetadata />
    <div className="resume-container">
      <header className="resume-introduction"><Reveal>
        <div className="resume-header-layout"><div>
          <p className="resume-small-label">R&eacute;sum&eacute;</p>
          <h1 id="page-heading">{profile.name}</h1>
          <p className="resume-role">{profile.title}</p>
          <p className="resume-location"><MapPin size={16} aria-hidden="true" />{contact.location}</p>
          <AvailabilityIndicator />
        </div><ResumeActions /></div>
      </Reveal></header>
      <div className="resume-content">
        <section aria-labelledby="resume-summary"><Reveal>
          <h2 id="resume-summary">Professional Summary</h2>
          <p className="resume-summary-text">{profile.resumeSummary}</p>
        </Reveal></section>
        <section aria-labelledby="resume-experience"><Reveal>
          <h2 id="resume-experience">Experience</h2><ResumeExperience />
        </Reveal></section>
        <div className="resume-background">
          <section aria-labelledby="resume-education"><Reveal>
            <h2 id="resume-education">Education</h2>
            <article className="resume-education"><h3>{profile.education.degree}</h3><p>{profile.education.institution}</p>
              <dl>
                {profile.education.expectedGraduation && <div><dt>Expected Graduation</dt><dd>{profile.education.expectedGraduation}</dd></div>}
                {profile.education.honors && <div><dt>Academic Honors</dt><dd>{profile.education.honors}</dd></div>}
              </dl>
            </article>
          </Reveal></section>
          <section aria-labelledby="resume-projects"><Reveal>
            <h2 id="resume-projects">Selected Project Experience</h2>
            <Link to="/projects" className="resume-all-projects">View all projects</Link>
            <ul className="resume-project-work">{resumeProjects.map(project => <li key={project.id}>
              <h3>{project.title}</h3>
              <p>{project.resumeDescription}</p><p className="resume-project-technologies"><strong>Technologies:</strong> {project.resumeTechnologies}</p>
            </li>)}</ul>
          </Reveal></section>
        </div>
        <section aria-labelledby="resume-skills"><Reveal>
          <h2 id="resume-skills">Skills</h2><ResumeSkills />
        </Reveal></section>
        <section aria-labelledby="resume-certifications"><Reveal>
          <h2 id="resume-certifications">Certifications</h2>
          <ul className="resume-certifications">{certifications.map(certification => <li key={certification.title}>
            <a href={certification.link} target="_blank" rel="noopener noreferrer" aria-label={`${certification.title} credential (opens in a new tab)`}><span>{certification.title}</span><ArrowUpRight size={16} aria-hidden="true" /></a>
          </li>)}</ul>
        </Reveal></section>
      </div>
      <section className="resume-closing" aria-labelledby="resume-closing-heading">
        <h2 id="resume-closing-heading">Let's talk about an opportunity.</h2>
        <ResumeActions includeDownload={false} />
      </section>
    </div>
  </div>;
}
