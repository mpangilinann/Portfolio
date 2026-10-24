import { useRef, useState, useSyncExternalStore } from "react";
import { motion as Motion } from "framer-motion";
import { aboutSkillCategories } from "../../data/about";
import useReducedMotion from "../../hooks/useReducedMotion";
import { Reveal, SectionHeading } from "../home/Primitives";

const desktopQuery = "(min-width: 768px)";
const subscribeLayout = callback => {
  const media = window.matchMedia(desktopQuery);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
};

export default function AboutSkillsDirectory() {
  const [selected, setSelected] = useState(0);
  const tabs = useRef([]);
  const reduced = useReducedMotion();
  const vertical = useSyncExternalStore(subscribeLayout, () => window.matchMedia(desktopQuery).matches, () => false);
  const category = aboutSkillCategories[selected];
  const onKeyDown = event => {
    const last = aboutSkillCategories.length - 1;
    let next;
    if (["ArrowRight", "ArrowDown"].includes(event.key)) next = (selected + 1) % (last + 1);
    if (["ArrowLeft", "ArrowUp"].includes(event.key)) next = (selected + last) % (last + 1);
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = last;
    if (next === undefined) return;
    event.preventDefault(); setSelected(next); tabs.current[next]?.focus();
  };
  return <section className="about-section" aria-labelledby="about-skills-heading">
    <Reveal><SectionHeading id="about-skills-heading" title="Skills & capabilities">The tools I build with, and the habits I bring to the work.</SectionHeading></Reveal>
    <Reveal className="about-directory">
      <div className="about-tabs" role="tablist" aria-label="Skill categories" aria-orientation={vertical ? "vertical" : "horizontal"} onKeyDown={onKeyDown}>
        {aboutSkillCategories.map((item, index) => <button type="button" key={item.id} ref={element => { tabs.current[index] = element; }}
          role="tab" id={"about-tab-" + item.id} aria-controls={"about-panel-" + item.id} aria-selected={index === selected}
          tabIndex={index === selected ? 0 : -1} onClick={() => setSelected(index)}>{item.label}<span aria-hidden="true">↗</span></button>)}
      </div>
      <div className="about-panels">
        {aboutSkillCategories.map((item, index) => <div key={item.id} id={"about-panel-" + item.id} role="tabpanel"
          aria-labelledby={"about-tab-" + item.id} hidden={selected !== index} tabIndex={0}>
          {selected === index && <Motion.div key={category.id} initial={reduced ? false : { opacity: .6, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : .18 }}>
            {category.groups.map((group, groupIndex) => <div className="about-skill-group" key={group.title ?? groupIndex}>
              {group.title && <h3>{group.title}</h3>}<ul className="about-skill-list">{group.skills.map(skill => {
                const Icon = skill.icon;
                return <li key={skill.title}>{(skill.svg || Icon) && <span className="about-skill-icon" aria-hidden="true">{skill.svg ?? <Icon size={20} />}</span>}
                  <div><p className="about-skill-name">{skill.title}</p>{skill.description && <p className="about-skill-description">{skill.description}</p>}</div>
                </li>;
              })}</ul>
            </div>)}
          </Motion.div>}
        </div>)}
      </div>
    </Reveal>
  </section>;
}
