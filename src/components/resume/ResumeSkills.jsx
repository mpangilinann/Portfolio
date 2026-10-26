import { useState, useSyncExternalStore } from "react";
import Reveal from "../motion/Reveal";
import { motionTiming } from "../../utils/motion";
import { resumeSkillGroups } from "../../data/resume";

const query = "(min-width: 768px)";
const subscribe = callback => {
  const media = window.matchMedia(query);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
};
const getSnapshot = () => window.matchMedia(query).matches;
const getServerSnapshot = () => false;

function SkillGroup({ group, wide, index }) {
  const [expanded, setExpanded] = useState(false);
  const visible = wide || !group.collapsible || expanded;
  const listId = `resume-skills-${group.id}`;
  return <Reveal className="resume-skill-group" preset="wave" delay={Math.floor(index / 2) * motionTiming.stagger}>
    <div className="resume-skill-heading"><h3>{group.label}</h3>
      {!wide && group.collapsible && <button type="button" className="resume-disclosure resume-skill-toggle" aria-expanded={visible} aria-controls={listId} aria-label={`${visible ? "Hide" : "Show"} ${group.label} skills`} onClick={() => setExpanded(value => !value)}><span aria-hidden="true">{visible ? "\u2212" : "+"}</span></button>}
    </div>
    <ul id={listId} hidden={!visible}>{group.skills.map(skill => <li key={skill}>{skill}</li>)}</ul>
  </Reveal>;
}

export default function ResumeSkills() {
  const wide = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return <div className="resume-skill-groups">{resumeSkillGroups.map((group, index) => <SkillGroup key={group.id} group={group} index={index} wide={wide} />)}</div>;
}
