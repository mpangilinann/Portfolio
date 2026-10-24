import { useState, useSyncExternalStore } from "react";
import { resumeSkillGroups } from "../../data/resume";

const query = "(min-width: 768px)";
const subscribe = callback => {
  const media = window.matchMedia(query);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
};
const getSnapshot = () => window.matchMedia(query).matches;
const getServerSnapshot = () => false;

function SkillGroup({ group, wide }) {
  const [expanded, setExpanded] = useState(false);
  const visible = wide || !group.collapsible || expanded;
  const listId = `resume-skills-${group.id}`;
  return <div className="resume-skill-group">
    <div className="resume-skill-heading"><h3>{group.label}</h3>
      {!wide && group.collapsible && <button type="button" className="resume-disclosure resume-skill-toggle" aria-expanded={visible} aria-controls={listId} aria-label={`${visible ? "Hide" : "Show"} ${group.label} skills`} onClick={() => setExpanded(value => !value)}><span aria-hidden="true">{visible ? "\u2212" : "+"}</span></button>}
    </div>
    <ul id={listId} hidden={!visible}>{group.skills.map(skill => <li key={skill}>{skill}</li>)}</ul>
  </div>;
}

export default function ResumeSkills() {
  const wide = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return <div className="resume-skill-groups">{resumeSkillGroups.map(group => <SkillGroup key={group.id} group={group} wide={wide} />)}</div>;
}
