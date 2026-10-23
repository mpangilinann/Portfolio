// Interface-building relationships, not proficiency or project-contribution claims.
export const technologyRelationships = {
  HTML: ["CSS", "JavaScript"],
  CSS: ["HTML", "Tailwind CSS"],
  JavaScript: ["React", "Vue.js", "Angular", "Node.js", "Express", "TypeScript"],
  TypeScript: ["JavaScript", "React", "Angular", "Node.js"],
  React: ["JavaScript", "TypeScript", "Tailwind CSS"],
  "Vue.js": ["JavaScript", "TypeScript"],
  Angular: ["TypeScript", "JavaScript"],
  "Node.js": ["JavaScript", "TypeScript", "Express", "MongoDB"],
  Express: ["Node.js", "JavaScript", "MongoDB"],
  MongoDB: ["Node.js", "Express"],
  "Tailwind CSS": ["CSS", "React"],
  Git: [],
  Figma: ["HTML", "CSS"],
};
