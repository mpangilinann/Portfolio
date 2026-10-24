import PageMetadata from "../components/PageMetadata";
import AboutIntroduction from "../components/about/AboutIntroduction";
import AboutSkillsDirectory from "../components/about/AboutSkillsDirectory";
import { ActionLink, Reveal, SectionHeading } from "../components/home/Primitives";
import { profile } from "../data/profile";
import { experiences } from "../data/experience";
import { developmentDirection } from "../data/about";
import "../styles/about.css";

export default function About() {
  return <div id="about" className="about-page"><PageMetadata /><div className="about-container">
    <AboutIntroduction />
    <section className="about-section" aria-labelledby="about-background-heading">
      <Reveal><SectionHeading id="about-background-heading" title="Direction & education" /></Reveal>
      <Reveal className="about-background-grid">
        <div><p className="about-label">Education</p><h3>{profile.education.degree}</h3><p>{profile.education.institution}</p></div>
        <div className="about-direction"><p className="about-label">Development direction</p><h3>Interfaces first. Connected systems behind them.</h3><p>{developmentDirection}</p></div>
      </Reveal>
    </section>
    <section className="about-section" aria-labelledby="about-experience-heading">
      <Reveal><SectionHeading id="about-experience-heading" title="Practical experience" /></Reveal>
      {experiences.map(experience => <Reveal key={experience.id}><article className="about-experience">
        <div className="about-date"><p>{experience.period}</p><p>{experience.arrangement}</p></div>
        <div><h3>{experience.role}</h3><p className="about-company">{experience.company}</p><p className="about-experience-summary">{experience.summary}</p>
          <ul>{experience.responsibilities.map(item => <li key={item}>{item}</li>)}</ul>
        </div>
      </article></Reveal>)}
    </section>
    <AboutSkillsDirectory />
    <section className="about-closing about-section" aria-labelledby="about-closing-heading">
      <Reveal className="about-closing-inner"><div><h2 id="about-closing-heading">Want the complete overview?</h2><p>My résumé brings together experience, skills, and certifications.</p></div>
        <div className="about-actions"><ActionLink to="/resume" primary>View Résumé</ActionLink><ActionLink to="/contact">Contact Me</ActionLink></div>
      </Reveal>
    </section>
  </div></div>;
}
