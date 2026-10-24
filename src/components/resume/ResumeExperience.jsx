import { useState } from "react";
import { experiences } from "../../data/experience";

function ExperienceEntry({ experience }) {
  const [expanded, setExpanded] = useState(false);
  const extraId = `${experience.id}-responsibilities`;
  return <article className="resume-experience-entry">
    <header className="resume-experience-header">
      <div><h3>{experience.role}</h3><p className="resume-company">{experience.company}</p><p className="resume-department">{experience.department}</p></div>
      <div className="resume-experience-date"><p>{experience.period}</p><p>{experience.arrangement}</p></div>
    </header>
    <p className="resume-experience-summary">{experience.summary}</p>
    <ul className="resume-responsibilities">{experience.responsibilities.slice(0, 4).map(item => <li key={item}>{item}</li>)}</ul>
    {experience.responsibilities.length > 4 && <>
      <button type="button" className="resume-disclosure" aria-expanded={expanded} aria-controls={extraId} onClick={() => setExpanded(value => !value)}>{expanded ? "Show fewer responsibilities" : "Show all responsibilities"}<span aria-hidden="true">{expanded ? "\u2212" : "+"}</span></button>
      <ul id={extraId} className="resume-responsibilities resume-extra-responsibilities" hidden={!expanded}>{experience.responsibilities.slice(4).map(item => <li key={item}>{item}</li>)}</ul>
    </>}
  </article>;
}

export default function ResumeExperience() {
  return experiences.map(experience => <ExperienceEntry key={experience.id} experience={experience} />);
}
