import { resumeSkills, resumeSoftSkills } from "./skillLists";

// Presentation labels reference the shared lists; factual skill strings stay shared.
export const resumeSkillGroups = [
  { id: "front-end", label: "Front-End Development", skills: resumeSkills["Front-end Development"] },
  { id: "back-end", label: "Back-End Development", skills: resumeSkills["Backend and Databases"] },
  { id: "tools", label: "Tools and Platforms", skills: resumeSkills["Development Tools"], collapsible: true },
  { id: "support", label: "IT Support and Systems", skills: resumeSkills["IT Support and Systems"], collapsible: true },
  { id: "professional", label: "Professional Skills", skills: resumeSoftSkills, collapsible: true },
];
