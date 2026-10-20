import { Users, Lightbulb, Clock, Target } from "lucide-react";
/* Icon Imports */
import { FaHtml5, FaCss3, FaJsSquare, FaAngular, FaBootstrap, FaNodeJs, FaPhp, FaGitAlt, FaGithub, FaFigma, FaWordpress, FaReact } from "react-icons/fa";
import { RiTailwindCssFill, RiVuejsFill } from "react-icons/ri";
import { SiExpress, SiMysql, SiMongodb, SiCanva } from "react-icons/si";
import { BiLogoVisualStudio } from "react-icons/bi";

/* ---------------- Icons using CSS Variables for color ---------------- */
const Icons = {
  HTML: <span style={{ color: "var(--text-color)" }} className="w-6 h-6 flex items-center justify-center"><FaHtml5 className="w-full h-full" /></span>,
  CSS: <span style={{ color: "var(--text-color)" }} className="w-6 h-6 flex items-center justify-center"><FaCss3 className="w-full h-full" /></span>,
  JavaScript: <span style={{ color: "var(--text-color)" }} className="w-6 h-6 flex items-center justify-center"><FaJsSquare className="w-full h-full" /></span>,
  Tailwind: <span style={{ color: "var(--text-color)" }} className="w-6 h-6 flex items-center justify-center"><RiTailwindCssFill className="w-full h-full" /></span>,React: <span style={{ color: "var(--text-color)" }} className="w-6 h-6 flex items-center justify-center"><FaReact className="w-full h-full" /></span>,
  Vue: <span style={{ color: "var(--text-color)" }} className="w-6 h-6 flex items-center justify-center"><RiVuejsFill className="w-full h-full" /></span>,
  Angular: <span style={{ color: "var(--text-color)" }} className="w-6 h-6 flex items-center justify-center"><FaAngular className="w-full h-full" /></span>,
  Bootstrap: <span style={{ color: "var(--text-color)" }} className="w-6 h-6 flex items-center justify-center"><FaBootstrap className="w-full h-full" /></span>,

  NodeJS: <span style={{ color: "var(--text-color)" }} className="w-6 h-6 flex items-center justify-center"><FaNodeJs className="w-full h-full" /></span>,
  ExpressJS: <span style={{ color: "var(--text-color)" }} className="w-6 h-6 flex items-center justify-center"><SiExpress className="w-full h-full" /></span>,
  PHP: <span style={{ color: "var(--text-color)" }} className="w-6 h-6 flex items-center justify-center"><FaPhp className="w-full h-full" /></span>,
  MySQL: <span style={{ color: "var(--text-color)" }} className="w-6 h-6 flex items-center justify-center"><SiMysql className="w-full h-full" /></span>,
  MongoDB: <span style={{ color: "var(--text-color)" }} className="w-6 h-6 flex items-center justify-center"><SiMongodb className="w-full h-full" /></span>,

  Git: <span style={{ color: "var(--text-color)" }} className="w-6 h-6 flex items-center justify-center"><FaGitAlt className="w-full h-full" /></span>,
  GitHub: <span style={{ color: "var(--text-color)" }} className="w-6 h-6 flex items-center justify-center"><FaGithub className="w-full h-full" /></span>,
  Figma: <span style={{ color: "var(--text-color)" }} className="w-6 h-6 flex items-center justify-center"><FaFigma className="w-full h-full" /></span>,
  Canva: <span style={{ color: "var(--text-color)" }} className="w-6 h-6 flex items-center justify-center"><SiCanva className="w-full h-full" /></span>,
  WordPress: <span style={{ color: "var(--text-color)" }} className="w-6 h-6 flex items-center justify-center"><FaWordpress className="w-full h-full" /></span>,
  VSCode: <span style={{ color: "var(--text-color)" }} className="w-6 h-6 flex items-center justify-center"><BiLogoVisualStudio className="w-full h-full" /></span>,
};

/* ---------------- Skill Data ---------------- */
export const frontendSkills = [
  { title: "HTML5", description: "Structuring semantic, accessible, and SEO-friendly web pages.", svg: Icons.HTML },
  { title: "CSS3", description: "Building responsive layouts, animations, and visual systems.", svg: Icons.CSS },
  { title: "JavaScript", description: "Creating dynamic and interactive web experiences using ES6+.", svg: Icons.JavaScript },
  { title: "Tailwind CSS", description: "Rapid UI styling with utility-first framework.", svg: Icons.Tailwind },
  { title: "React", description: "Building modern, component-based user interfaces and state-managed applications.", svg: Icons.React },
  { title: "Vue.js", description: "Building reactive interfaces and SPAs.", svg: Icons.Vue },
  { title: "Angular", description: "Developing structured front-end applications.", svg: Icons.Angular },
  { title: "Bootstrap", description: "Designing responsive components and grids.", svg: Icons.Bootstrap },
];

export const backendSkills = [
  { title: "Node.js", description: "Server-side JavaScript runtime environment.", svg: Icons.NodeJS },
  { title: "Express.js", description: "Building backend APIs and middleware.", svg: Icons.ExpressJS },
  { title: "PHP", description: "Dynamic web applications and server-side scripting.", svg: Icons.PHP },
  { title: "MySQL", description: "Database management and query handling.", svg: Icons.MySQL },
  { title: "MongoDB", description: "NoSQL database for flexible, document-oriented data storage and retrieval.", svg: Icons.MongoDB },
];

export const tools = [
  { title: "Git", description: "Distributed version control system for tracking code changes and collaboration.", svg: Icons.Git },
  { title: "GitHub", description: "Repository hosting platform for code management and team collaboration.", svg: Icons.GitHub },
  { title: "Figma", description: "Collaborative UI/UX design tool for wireframing, prototyping, and visual design.", svg: Icons.Figma },
  { title: "Canva", description: "Graphic design platform for creating visual content and marketing materials.", svg: Icons.Canva },
  { title: "WordPress", description: "Content management system for building websites and managing digital content.", svg: Icons.WordPress },
  { title: "VS Code", description: "Primary code editor with extensive extensions for modern web development.", svg: Icons.VSCode },
];

/* ---------------- Soft Skills ---------------- */
export const softSkills = [
  { icon: Users, title: "Teamwork", description: "Collaborating effectively within teams to achieve goals." },
  { icon: Lightbulb, title: "Problem Solving", description: "Analyzing challenges and finding creative solutions." },
  { icon: Clock, title: "Time Management", description: "Prioritizing tasks and meeting deadlines efficiently." },
  { icon: Target, title: "Goal-Oriented", description: "Focusing on objectives and delivering results consistently." },
];


export const resumeSkills = {
  "frontend": [
    "HTML5",
    "CSS3",
    "JavaScript (ES6+)",
    "TypeScript",
    "Tailwind CSS",
    "React.js",
    "Vue.js",
    "Angular 18",
    "Bootstrap"
  ],
  "backend": [
    "Node.js",
    "Express.js",
    "PHP",
    "MySQL",
    "MongoDB"
  ],
  "tools": [
    "Figma",
    "Canva",
    "Git",
    "GitHub",
    "WordPress",
    "Visual Studio Code",
    "AWS"
  ]
};
export const resumeSoftSkills = [
  "Attention to Detail",
  "Adaptability",
  "Time Management",
  "Teamwork"
];
export const marqueeSkills = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Vue.js",
  "Angular",
  "Node.js",
  "Express",
  "MongoDB",
  "Git",
  "Figma",
  "Tailwind CSS",
  "TypeScript"
];
