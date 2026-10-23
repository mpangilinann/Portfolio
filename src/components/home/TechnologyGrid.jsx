import { SiHtml5, SiCss3, SiJavascript, SiReact, SiVuedotjs, SiAngular, SiNodedotjs, SiExpress, SiMongodb, SiGit, SiFigma, SiTailwindcss, SiTypescript } from "react-icons/si";
import { marqueeSkills } from "../../data/skillLists";
import { useEffect, useRef, useState } from "react";
import { technologyRelationships } from "../../data/technologyRelationships";
import useFinePointer from "../../hooks/useFinePointer";

const icons = [SiHtml5, SiCss3, SiJavascript, SiReact, SiVuedotjs, SiAngular, SiNodedotjs, SiExpress, SiMongodb, SiGit, SiFigma, SiTailwindcss, SiTypescript];

export default function TechnologyGrid() {
  const ref = useRef(null);
  const fine = useFinePointer();
  const [hovered, setHovered] = useState(null);
  const [focused, setFocused] = useState(null);
  const [selected, setSelected] = useState(null);
  const active = hovered ?? focused ?? selected;
  const clear = () => { setHovered(null); setFocused(null); setSelected(null); };
  useEffect(() => {
    const outside = event => {
      if (!ref.current?.contains(event.target)) { setHovered(null); setFocused(null); setSelected(null); }
    };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, []);
  return <ul ref={ref} className="technology-grid" aria-label="Technology stack" onPointerLeave={() => setHovered(null)} onKeyDown={event => { if (event.key === "Escape") clear(); }}>{marqueeSkills.map((name, index) => {
    const Icon = icons[index];
    const relation = !active ? "idle" : active === name ? "active" : technologyRelationships[active]?.includes(name) ? "related" : "unrelated";
    return <li key={name} data-relation={relation}><button type="button" aria-pressed={active === name} aria-label={`${name}: highlight related technologies`} aria-description={name === "Git" ? "Version control across the development workflow." : `Related technologies: ${technologyRelationships[name].join(", ")}.`} onPointerEnter={event => { if (fine && event.pointerType !== "touch") setHovered(name); }} onFocus={() => { setHovered(null); setFocused(name); }} onBlur={() => setFocused(null)} onClick={() => { setHovered(null); setFocused(null); setSelected(selected === name ? null : name); }}><Icon size={20} aria-hidden="true" /><span>{name}</span></button></li>;
  })}</ul>;
}
