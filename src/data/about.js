import { frontendSkills, backendSkills, tools, softSkills } from "./skills";
import { resumeSkills, resumeSoftSkills } from "./skillLists";

// Reconcile existing About/Resume labels; the shared sources own the facts.
const aliases = { "JavaScript (ES6+)": "JavaScript", "React.js": "React", "Angular 18": "Angular", "Visual Studio Code": "VS Code" };
const canonical = title => aliases[title] ?? title;
const mergeSkills = (details, names) => {
  const entries = new Map(details.map(skill => [canonical(skill.title), skill]));
  names.forEach(title => { const key = canonical(title); entries.set(key, { ...entries.get(key), title }); });
  return [...entries.values()];
};
export const developmentDirection = "My focus is front-end work: responsive, accessible interfaces, with APIs and databases connecting the experience underneath. Projects and practical experience give me room to keep learning.";
export const aboutSkillCategories = [
  { id: "front-end", label: "Front-End", groups: [{ skills: mergeSkills(frontendSkills, resumeSkills["Front-end Development"]) }] },
  { id: "back-end", label: "Back-End", groups: [{ skills: mergeSkills(backendSkills, resumeSkills["Backend and Databases"]) }] },
  { id: "tools", label: "Tools & Platforms", groups: [{ skills: mergeSkills(tools, resumeSkills["Development Tools"]) }] },
  { id: "professional", label: "Professional Skills", groups: [
    { title: "Working with people", skills: mergeSkills(softSkills, resumeSoftSkills) },
    { title: "IT support & systems", skills: resumeSkills["IT Support and Systems"].map(title => ({ title })) },
  ] },
];
