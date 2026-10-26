import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { motion as Motion, useAnimationControls } from "framer-motion";
import { aboutSkillCategories } from "../../data/about";
import useReducedMotion from "../../hooks/useReducedMotion";
import { Reveal, SectionHeading } from "../home/Primitives";
import { revealTiming } from "../../utils/revealMotion";
import { motionEase, motionTiming } from "../../utils/motion";

const desktopQuery = "(min-width: 768px)";
const subscribeLayout = callback => {
  const media = window.matchMedia(desktopQuery);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
};

function SkillPanel({ category, active, reduced }) {
  const [hidden, setHidden] = useState(!active);
  const controls = useAnimationControls();
  useEffect(() => {
    controls.start({ opacity: active ? 1 : 0, y: active ? 0 : 8, transition: { duration: reduced ? 0 : revealTiming.crossfade, ease: motionEase } });
    return () => controls.stop();
  }, [active, reduced, controls]);
  return <Motion.div id={"about-panel-" + category.id} role="tabpanel"
    aria-labelledby={"about-tab-" + category.id} aria-hidden={!active} inert={!active}
    hidden={!active && hidden} tabIndex={active ? 0 : -1}
    initial={false} animate={controls}
    onAnimationStart={() => { if (active) setHidden(false); }}
    onAnimationComplete={() => setHidden(!active)}
    style={{ position: active ? "relative" : "absolute", inset: 0, pointerEvents: active ? "auto" : "none" }}>
    {category.groups.map((group, groupIndex) => <div className="about-skill-group" key={group.title ?? groupIndex}>
      {group.title && <h3>{group.title}</h3>}<ul className="about-skill-list">{group.skills.map((skill, index) => {
        const Icon = skill.icon;
        const professional = category.id === "professional";
        const Item = professional ? Reveal : "li";
        return <Item key={skill.title} {...(professional ? { as: "li", preset: "fade", delay: Math.floor(index / 3) * motionTiming.stagger } : {})}>
          {(skill.svg || Icon) && <span className="about-skill-icon" aria-hidden="true">{skill.svg ?? <Icon size={20} />}</span>}
          <div><p className="about-skill-name">{skill.title}</p>{skill.description && <p className="about-skill-description">{skill.description}</p>}</div>
        </Item>;
      })}</ul>
    </div>)}
  </Motion.div>;
}

export default function AboutSkillsDirectory() {
  const [selected, setSelected] = useState(0);
  const tabs = useRef([]);
  const reduced = useReducedMotion();
  const vertical = useSyncExternalStore(subscribeLayout, () => window.matchMedia(desktopQuery).matches, () => false);
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
    <Reveal preset="mask"><SectionHeading id="about-skills-heading" title="Skills & capabilities">The tools I build with, and the habits I bring to the work.</SectionHeading></Reveal>
    <div className="about-directory">
      <div className="about-tabs" role="tablist" aria-label="Skill categories" aria-orientation={vertical ? "vertical" : "horizontal"} onKeyDown={onKeyDown}>
        {aboutSkillCategories.map((item, index) => <Reveal as="button" preset="document" delay={index * motionTiming.stagger} type="button" key={item.id} ref={element => { tabs.current[index] = element; }}
          role="tab" id={"about-tab-" + item.id} aria-controls={"about-panel-" + item.id} aria-selected={index === selected}
          tabIndex={index === selected ? 0 : -1} onClick={() => setSelected(index)}>{item.label}<span aria-hidden="true">↗</span></Reveal>)}
      </div>
      <Reveal className="about-panels" preset="fade" delay={2 * motionTiming.stagger} style={{ position: "relative" }}>
        {aboutSkillCategories.map((item, index) => <SkillPanel key={item.id} category={item} active={selected === index} reduced={reduced} />)}
      </Reveal>
    </div>
  </section>;
}
