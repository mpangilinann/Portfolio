import { motion } from "framer-motion";
import { Users, Lightbulb, Clock, Target } from "lucide-react";
import { Helmet } from 'react-helmet';


/* ---------------- Inline SVG Icons - Monochrome ---------------- */
const Icons = {
  HTML: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className="w-6 h-6 text-gray-800 dark:text-gray-200">
      <path fill="currentColor" d="M19.037 113.876L9.032 1.661h109.936l-10.016 112.198-45.019 12.48z" />
      <path fill="currentColor" d="M64 116.8l36.378-10.086 8.559-95.878H64z" />
      <path fill="currentColor" d="M64 52.455H45.788L44.53 38.361H64V24.599H29.489l.33 3.692 3.382 37.927H64zm0 35.743l-.061.017-15.327-4.14-.979-10.975H33.816l1.928 21.609 28.193 7.826.063-.017z" />
      <path fill="currentColor" d="M63.952 52.455v13.763h16.947l-1.597 17.849-15.35 4.143v14.319l28.215-7.82.207-2.325 3.234-36.233.335-3.696h-3.708zm0-27.856v13.762h33.244l.276-3.092.628-6.978.329-3.692z" />
    </svg>
  ),
  CSS: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className="w-6 h-6 text-gray-800 dark:text-gray-200">
      <path fill="currentColor" d="M18.814 114.123L8.76 1.352h110.48l-10.064 112.754-45.243 12.543-45.119-12.526z" />
      <path fill="currentColor" d="M64.001 117.062l36.559-10.136 8.601-96.354h-45.16v106.49z" />
      <path fill="currentColor" d="M64.001 51.429h18.302l1.264-14.163H64.001V23.435h34.682l-.332 3.711-3.4 38.114h-30.95V51.429z" />
      <path fill="currentColor" d="M64.083 87.349l-.061.018-15.403-4.159-.985-11.031H33.752l1.937 21.717 28.331 7.863.063-.018v-14.39z" />
      <path fill="currentColor" d="M81.127 64.675l-1.666 18.522-15.426 4.164v14.39l28.354-7.858.208-2.337 2.406-26.881H81.127z" />
      <path fill="currentColor" d="M64.048 23.435v13.831H30.64l-.277-3.108-.63-7.012-.331-3.711h34.646zm-.047 27.996v13.831H48.792l-.277-3.108-.631-7.012-.33-3.711h16.447z" />
    </svg>
  ),
  JavaScript: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className="w-6 h-6 text-gray-800 dark:text-gray-200">
      <path fill="currentColor" d="M1.408 1.408h125.184v125.185H1.408z" />
      <path fill="currentColor" d="M116.347 96.736c-.917-5.711-4.641-10.508-15.672-14.981-3.832-1.761-8.104-3.022-9.377-5.926-.452-1.69-.512-2.642-.226-3.665.821-3.32 4.784-4.355 7.925-3.403 2.023.678 3.938 2.237 5.093 4.724 5.402-3.498 5.391-3.475 9.163-5.879-1.381-2.141-2.118-3.129-3.022-4.045-3.249-3.629-7.676-5.498-14.756-5.355l-3.688.477c-3.534.893-6.902 2.748-8.877 5.235-5.926 6.724-4.236 18.492 2.975 23.335 7.104 5.332 17.54 6.545 18.873 11.531 1.297 6.104-4.486 8.08-10.234 7.378-4.236-.881-6.592-3.034-9.139-6.949-4.688 2.713-4.688 2.713-9.508 5.485 1.143 2.499 2.344 3.63 4.26 5.795 9.068 9.198 31.76 8.746 35.83-5.176.165-.478 1.261-3.666.38-8.581zM69.462 58.943H57.753l-.048 30.272c0 6.438.333 12.34-.714 14.149-1.713 3.558-6.152 3.117-8.175 2.427-2.059-1.012-3.106-2.451-4.319-4.485-.333-.584-.583-1.036-.667-1.071l-9.52 5.83c1.583 3.249 3.915 6.069 6.902 7.901 4.462 2.678 10.459 3.499 16.731 2.059 4.082-1.189 7.604-3.652 9.448-7.401 2.666-4.915 2.094-10.864 2.07-17.444.06-10.735.001-21.468.001-32.237z" />
    </svg>
  ),
  Tailwind: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className="w-6 h-6 text-gray-800 dark:text-gray-200">
      <path fill="currentColor" d="M64.004 25.602c-17.067 0-27.73 8.53-32 25.597 6.398-8.531 13.867-11.73 22.398-9.597 4.871 1.214 8.352 4.746 12.207 8.66C72.883 56.629 80.145 64 96.004 64c17.066 0 27.73-8.531 32-25.602-6.399 8.536-13.867 11.735-22.399 9.602-4.87-1.215-8.347-4.746-12.207-8.66-6.27-6.367-13.53-13.738-29.394-13.738zM32.004 64c-17.066 0-27.73 8.531-32 25.602C6.402 81.066 13.87 77.867 22.402 80c4.871 1.215 8.352 4.746 12.207 8.66 6.274 6.367 13.536 13.738 29.395 13.738 17.066 0 27.73-8.53 32-25.597-6.399 8.531-13.867 11.73-22.399 9.597-4.87-1.214-8.347-4.746-12.207-8.66C55.128 71.371 47.868 64 32.004 64zm0 0" />
    </svg>
  ),
  Vue: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className="w-6 h-6 text-gray-800 dark:text-gray-200">
      <path fill="currentColor" d="M25.997 9.393l23.002.009L64.035 34.36 79.018 9.404 102 9.398 64.15 75.053z" />
      <path fill="currentColor" d="M.91 9.569l25.067-.172 38.15 65.659L101.98 9.401l25.11.026-62.966 108.06z" />
    </svg>
  ),
  Angular: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className="w-6 h-6 text-gray-800 dark:text-gray-200">
      <path fill="currentColor" d="M63.81 1.026L4.553 21.88l9.363 77.637 49.957 27.457 50.214-27.828 9.36-77.635z" />
      <path fill="currentColor" d="M117.536 25.998L63.672 7.629v112.785l45.141-24.983z" />
      <path fill="currentColor" d="M11.201 26.329l8.026 69.434 44.444 24.651V7.627z" />
      <path fill="currentColor" d="M78.499 67.67l-14.827 6.934H48.044l-7.347 18.374-13.663.254 36.638-81.508L78.499 67.67zm-1.434-3.491L63.77 37.858 52.864 63.726h10.807l13.394.453z" />
    </svg>
  ),
  Bootstrap: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className="w-6 h-6 text-gray-800 dark:text-gray-200">
      <path fill="currentColor" d="M14.985 27.712c-.237-6.815 5.072-13.099 12.249-13.099h73.54c7.177 0 12.486 6.284 12.249 13.099-.228 6.546.068 15.026 2.202 21.94 2.141 6.936 5.751 11.319 11.664 11.883v6.387c-5.913.564-9.523 4.947-11.664 11.883-2.134 6.914-2.43 15.394-2.202 21.94.237 6.815-5.072 13.098-12.249 13.098h-73.54c-7.177 0-12.486-6.284-12.249-13.098.228-6.546-.068-15.026-2.203-21.94-2.14-6.935-5.76-11.319-11.673-11.883v-6.387c5.913-.563 9.533-4.947 11.673-11.883 2.135-6.914 2.43-15.394 2.203-21.94z" />
    </svg>
  ),
  NodeJS: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className="w-6 h-6 text-gray-800 dark:text-gray-200">
      <path fill="currentColor" d="M112.771 30.334L68.674 4.729c-2.781-1.584-6.402-1.584-9.205 0L14.901 30.334C12.031 31.985 10 35.088 10 38.407v51.142c0 3.319 2.084 6.423 4.954 8.083l11.775 6.688c5.628 2.772 7.617 2.772 10.178 2.772 8.333 0 13.093-5.039 13.093-13.828v-50.49c0-.713-.371-1.774-1.071-1.774h-5.623C42.594 41 41 42.061 41 42.773v50.49c0 3.896-3.524 7.773-10.11 4.48L18.723 90.73c-.424-.23-.723-.693-.723-1.181V38.407c0-.482.555-.966.982-1.213l44.424-25.561c.415-.235 1.025-.235 1.439 0l43.882 25.555c.42.253.272.722.272 1.219v51.142c0 .488.183.963-.232 1.198l-44.086 25.576c-.378.227-.847.227-1.261 0l-11.307-6.749c-.341-.198-.746-.269-1.073-.086-3.146 1.783-3.726 2.02-6.677 3.043-.726.253-1.797.692.41 1.929l14.798 8.754a9.294 9.294 0 004.647 1.246c1.642 0 3.25-.426 4.667-1.246l43.885-25.582c2.87-1.672 4.23-4.764 4.23-8.083V38.407c0-3.319-1.36-6.414-4.229-8.073z" />
    </svg>
  ),
  ExpressJS: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className="w-6 h-6 text-gray-800 dark:text-gray-200">
      <path fill="currentColor" d="M126.67 98.44c-4.56 1.16-7.38.05-9.91-3.75-5.68-8.51-11.95-16.63-18-24.9-.78-1.07-1.59-2.12-2.6-3.45C89 76 81.85 85.2 75.14 94.77c-2.4 3.42-4.92 4.91-9.4 3.7l26.92-36.13L67.6 29.71c4.31-.84 7.29-.41 9.93 3.45 5.83 8.52 12.26 16.63 18.67 25.21 6.45-8.55 12.8-16.67 18.8-25.11 2.41-3.42 5-4.72 9.33-3.46-3.28 4.35-6.49 8.63-9.72 12.88-4.36 5.73-8.64 11.53-13.16 17.14-1.61 2-1.35 3.3.09 5.19C109.9 76 118.16 87.1 126.67 98.44z" />
    </svg>
  ),
  PHP: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className="w-6 h-6 text-gray-800 dark:text-gray-200">
      <path fill="currentColor" d="M64 95.167c33.965 0 61.5-13.955 61.5-31.167 0-17.214-27.535-31.167-61.5-31.167S2.5 46.786 2.5 64c0 17.212 27.535 31.167 61.5 31.167Z" />
    </svg>
  ),
  MySQL: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className="w-6 h-6 text-gray-800 dark:text-gray-200">
      <path fill="currentColor" d="M64 127c17-7 32-23 32-56 0-37-24-56-32-56-8 0-32 19-32 56 0 33 15 49 32 56z" />
    </svg>
  ),
  MongoDB: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className="w-6 h-6 text-gray-800 dark:text-gray-200">
      <path fill="currentColor" d="M88 43c2 5 3 10 3 15 0 6-1 12-1 18-1 0-1 0-1 0-3 1-7 1-10 2-3 1-7 1-10 2-1 .2-2 0-3 2v-10l-1-24 2-1c3-1 6-1 10-1 1 0 3 0 4-1zM62 110c-2-1-3-3-5-4-9-8-15-18-18-30-1-3-1-6-2-10 0-2 0-5 0-7 0-6 1-12 3-18l.1.1c2 5 4 10 5 16 5 16 11 33 16 49l-1 3zM65 81c0-1 1-1 3-2 3-1 7-1 10-2 3-1 7-1 10-2 0 2-1 4-2 7-1 2-2 5-3 7-2 3-4 4-6 7-1 1-3 2-4 3l-1-1-1-3c-1-3-1-7-1-10z" />
    </svg>
  ),
  Git: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className="w-6 h-6 text-gray-800 dark:text-gray-200">
      <path fill="currentColor" d="M64 7.78L7.78 64 64 120.22 120.22 64 64 7.78zM86.34 45.66c1.11-.74 1.77-2 1.77-3.39 0-2.21-1.79-4-4-4s-4 1.79-4 4c0 .77.23 1.49.62 2.09L64 64l-16.73-13.64c.39-.6.62-1.32.62-2.09 0-2.21-1.79-4-4-4s-4 1.79-4 4c0 1.39.66 2.65 1.77 3.39L55.28 70.3c-.29.83-.28 1.74.09 2.55l-7.46 7.46c-1.12-.32-2.29-.25-3.35.35-1.65.89-2.41 2.83-1.96 4.63.21.82.69 1.51 1.33 1.97l8.47 6.36c.69.52 1.56.72 2.42.58.85-.14 1.6-.6 2.04-1.3l7.46-7.46c.81.37 1.72.38 2.55.09l20.64-14.72zm-6.38 28.62L72.31 59.38l5.65-5.66 7.4 7.4-5.63 5.66z" />
    </svg>
  ),

  GitHub: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className="w-6 h-6 text-gray-800 dark:text-gray-200">
      <path fill="currentColor" d="M64 .5C28.66.5 0 29.16 0 64.5c0 28.27 18.29 52.25 43.68 60.78 3.2.6 4.37-1.38 4.37-3.06 0-1.52-.06-5.54-.08-10.89-17.75 3.86-21.5-8.55-21.5-8.55-2.9-7.36-7.08-9.32-7.08-9.32-5.79-3.96.44-3.88.44-3.88 6.4.45 9.76 6.58 9.76 6.58 5.69 9.75 14.93 6.93 18.57 5.3.58-4.12 2.22-6.93 4.03-8.53-14.18-1.62-29.07-7.09-29.07-31.54 0-6.97 2.49-12.65 6.58-17.1-.66-1.62-2.85-8.14.62-16.98 0 0 5.37-1.72 17.6 6.56 5.11-1.42 10.57-2.13 16.02-2.15 5.44.02 10.91.73 16.02 2.15 12.23-8.28 17.6-6.56 17.6-6.56 3.47 8.84 1.29 15.36.63 16.98 4.1 4.45 6.57 10.13 6.57 17.1 0 24.53-14.9 29.9-29.07 31.49 2.28 1.97 4.31 5.85 4.31 11.79 0 8.51-.08 15.36-.08 17.44 0 1.69 1.15 3.68 4.4 3.06C109.72 116.73 128 92.77 128 64.5 128 29.16 99.34.5 64 .5z" />
    </svg>
  ),

  Figma: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className="w-6 h-6 text-gray-800 dark:text-gray-200">
      <path fill="currentColor" d="M64 0c-17.67 0-32 14.33-32 32s14.33 32 32 32 32-14.33 32-32S81.67 0 64 0zm0 56c-13.23 0-24-10.77-24-24S50.77 8 64 8s24 10.77 24 24-10.77 24-24 24zM32 64H0v64h32V64zm32 0H32v64h32V64zm32 0H64v64h32V64zm32 0h-32v64h32V64z" />
    </svg>
  ),

  Canva: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className="w-6 h-6 text-gray-800 dark:text-gray-200">
      <path fill="currentColor" d="M32 0C14.33 0 0 14.33 0 32v64c0 17.67 14.33 32 32 32 17.67 0 32-14.33 32-32V32c0-17.67-14.33-32-32-32zm64 32c0-17.67-14.33-32-32-32v64c17.67 0 32-14.33 32-32z" />
    </svg>
  ),

  WordPress: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className="w-6 h-6 text-gray-800 dark:text-gray-200">
      <path fill="currentColor" d="M64 8C33.15 8 8 33.15 8 64s25.15 56 56 56 56-25.15 56-56S94.85 8 64 8zm24.22 90.41c-2.04 4.02-5.62 7.16-9.75 8.88L64 73.47 49.57 107.29c-4.13-1.72-7.71-4.86-9.75-8.88L48.53 64l-15.71-33.3c2.04-4.02 5.62-7.16 9.75-8.88L64 54.53l14.43-36.41c4.13 1.72 7.71 4.86 9.75 8.88L79.47 64l15.75 34.41z" />
    </svg>
  ),

  VSCode: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className="w-6 h-6 text-gray-800 dark:text-gray-200">
      <path fill="currentColor" d="M8 16l40 32L8 80V16zm48 0v96l40-32V48L56 16zm-8 6.4L25.6 48 40 59.2V22.4zM72 80l14.4 11.2L80 96V80zm0-32v16l14.4 11.2L72 48z" />
    </svg>
  ),



};


/* ---------------- Skill Data ---------------- */
const frontendSkills = [
  { title: "HTML5", description: "Structuring semantic, accessible, and SEO-friendly web pages.", svg: Icons.HTML },
  { title: "CSS3", description: "Building responsive layouts, animations, and visual systems.", svg: Icons.CSS },
  { title: "JavaScript", description: "Creating dynamic and interactive web experiences using ES6+.", svg: Icons.JavaScript },
  { title: "Tailwind CSS", description: "Rapid UI styling with utility-first framework.", svg: Icons.Tailwind },
  { title: "Vue.js", description: "Building reactive interfaces and SPAs.", svg: Icons.Vue },
  { title: "Angular", description: "Developing structured front-end applications.", svg: Icons.Angular },
  { title: "Bootstrap", description: "Designing responsive components and grids.", svg: Icons.Bootstrap },
];

const backendSkills = [
  { title: "Node.js", description: "Server-side JavaScript runtime environment.", svg: Icons.NodeJS },
  { title: "Express.js", description: "Building backend APIs and middleware.", svg: Icons.ExpressJS },
  { title: "PHP", description: "Dynamic web applications and server-side scripting.", svg: Icons.PHP },
  { title: "MySQL", description: "Database management and query handling.", svg: Icons.MySQL },
  { title: "MongoDB", description: "NoSQL database for flexible, document-oriented data storage and retrieval.", svg: Icons.MongoDB },
];


const tools = [
  { title: "Git", description: "Distributed version control system for tracking code changes and collaboration.", svg: Icons.Git },
  { title: "GitHub", description: "Repository hosting platform for code management and team collaboration.", svg: Icons.GitHub },
  { title: "Figma", description: "Collaborative UI/UX design tool for wireframing, prototyping, and visual design.", svg: Icons.Figma },
  { title: "Canva", description: "Graphic design platform for creating visual content and marketing materials.", svg: Icons.Canva },
  { title: "WordPress", description: "Content management system for building websites and managing digital content.", svg: Icons.WordPress },
  { title: "VS Code", description: "Primary code editor with extensive extensions for modern web development.", svg: Icons.VSCode },
];


/* ---------------- Soft Skills ---------------- */
const softSkills = [
  { icon: Users, title: "Teamwork", description: "Collaborating effectively within teams to achieve goals." },
  { icon: Lightbulb, title: "Problem Solving", description: "Analyzing challenges and finding creative solutions." },
  { icon: Clock, title: "Time Management", description: "Prioritizing tasks and meeting deadlines efficiently." },
  { icon: Target, title: "Goal-Oriented", description: "Focusing on objectives and delivering results consistently." },
];

/* ---------------- Skill Card Component ---------------- */
const SkillDetailCard = ({ svg, title, description, IconComponent, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 40, scale: 0.95 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
    viewport={{ once: true }}
    className="group p-6 border rounded-2xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
    style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
  >
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl transition-colors duration-300" style={{ backgroundColor: "var(--section-bg)", color: "var(--text-color)" }}>
        {svg ? svg : <IconComponent className="w-6 h-6" />}
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-bold mb-2 tracking-tight" style={{ color: "var(--text-color)" }}>{title}</h3>
        <p className="text-sm leading-relaxed" style={{ color: "var(--text-color)" }}>{description}</p>
      </div>
    </div>
  </motion.div>
);

/* ---------------- About Component ---------------- */
export default function About() {
  return (
    <section id="about" className="px-6 py-12 md:py-16">


      <Helmet>
        <title>About | Mikko Pangilinan</title>
        <meta
          name="description"
          content="Learn more about Mikko Pangilinan, a front-end web developer passionate about creating responsive, modern, and user-friendly web experiences."
        />
      </Helmet>

      {/* About Me Section */}
      <div
        className="relative max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-24 min-h-[75vh] overflow-hidden"
        style={{ color: "var(--text-color)" }}
      >

        {/* ===== Advanced About Grid Background ===== */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">

          {/* Base Grid (Tighter + Softer) */}
          <div
            className="absolute inset-0 grid-base"
            style={{
              backgroundImage: `
          linear-gradient(var(--text-color) 1px, transparent 1px),
          linear-gradient(90deg, var(--text-color) 1px, transparent 1px)
        `,
              backgroundSize: "60px 60px",
              opacity: 0.08,
            }}
          />


          {/* Diagonal Accent */}
          <div
            className="absolute inset-0 about-diagonal-lines"
            style={{
              backgroundImage: `
          repeating-linear-gradient(
            -45deg,
            var(--text-color),
            var(--text-color) 1px,
            transparent 1px,
            transparent 80px
          )
        `,
              opacity: 0.05,
            }}
          />

          {/* Radial Fade (Depth Effect) */}
          <div
            className="absolute inset-"
            style={{
              background:
                "radial-gradient(circle at center, transparent 40%, var(--bg-color) 85%)",
            }}
          />
        </div>

        {/* ===== Left Column - Profile Photo ===== */}
        <div className="relative z-10 flex-shrink-0 w-full md:w-auto flex flex-col items-center text-center animate-fadeUp">
          <div className="w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-gray-300 dark:border-gray-600 shadow-lg transition-all duration-700 hover:scale-105 hover:shadow-2xl">
            <img
              src=""
              alt="Profile"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
            />
          </div>

          <div className="mt-6">
            <h2
              className="text-xl md:text-2xl font-semibold transition-all duration-700 hover:tracking-wide"
              style={{ color: "var(--text-color)" }}
            >
              Mikko E. Pangilinan
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base transition-opacity duration-700 hover:opacity-80">
              BSIT Web Development | Front-End Developer
            </p>
          </div>
        </div>

        {/* ===== Right Column - Text Content ===== */}
        <div className="relative z-10 flex-1 flex flex-col justify-center space-y-6 text-center md:text-left animate-fadeUp delay-200">
          <h1
            className="text-4xl md:text-5xl font-bold transition-all duration-700 hover:tracking-wider"
            style={{ color: "var(--text-color)" }}
          >
            ABOUT ME
          </h1>

          <p
            className="text-lg md:text-xl leading-relaxed transition-all duration-700 hover:translate-x-1"
            style={{ color: "var(--text-color)" }}
          >
            I am a passionate front-end web developer focused on building responsive,
            user-friendly, and visually refined web applications. My journey started
            from curiosity about how design and code merge to create seamless digital
            experiences.
          </p>

          <p
            className="text-lg md:text-xl leading-relaxed transition-all duration-700 hover:translate-x-1"
            style={{ color: "var(--text-color)" }}
          >
            I value clean architecture, maintainable code, and thoughtful UI
            decisions. My goal is not just to make applications work—but to make them
            feel intuitive and polished.
          </p>

          <p
            className="text-lg md:text-xl leading-relaxed transition-all duration-700 hover:translate-x-1"
            style={{ color: "var(--text-color)" }}
          >
            Outside of coding, I explore modern design systems, improve my development
            workflow, and continuously refine my skills to grow as a developer. I
            enjoy collaborating on projects, solving complex problems, and learning
            new frameworks that push my skills further.
          </p>

          {/* Skills Badges */}
          <div className="mt-4 flex flex-wrap gap-4 justify-center md:justify-start">
            {["Front-End", "UI/UX", "Responsive Design"].map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-full text-gray-800 dark:text-gray-200 text-sm md:text-base transition-all duration-500 hover:scale-105 hover:bg-gray-300 dark:hover:bg-gray-600 hover:-translate-y-1"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>




      {/* Divider */}
      <hr className="my-12 border-gray-300 dark:border-gray-600 transition-colors duration-500" />

      {/* Frontend Skills */}
      <div className="max-w-6xl mx-auto">
        <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-center md:text-left" style={{ color: "var(--text-color)" }}>
          FRONTEND DEVELOPMENT
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {frontendSkills.map((skill, index) => (
            <SkillDetailCard key={skill.title} {...skill} index={index} />
          ))}
        </div>
      </div>

      {/* Backend Skills */}
      <div className="max-w-6xl mx-auto">
        <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-center md:text-left" style={{ color: "var(--text-color)" }}>
          BACKEND DEVELOPMENT
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {backendSkills.map((skill, index) => (
            <SkillDetailCard key={skill.title} {...skill} index={index} />
          ))}
        </div>
      </div>

      {/* Tools */}
      <div className="max-w-6xl mx-auto mb-12">
        <h3
          className="text-2xl md:text-3xl font-semibold mb-6 text-center md:text-left transition-colors duration-500"
          style={{ color: "var(--text-color)" }}
        >
          Tools & Platforms
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <SkillDetailCard
              key={tool.title}
              svg={tool.svg}
              title={tool.title}
              description={tool.description}
              index={index}
            />
          ))}
        </div>
      </div>




      {/* Soft Skills */}
      <div className="max-w-6xl mx-auto">
        <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-center md:text-left" style={{ color: "var(--text-color)" }}>
          SOFT SKILLS
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {softSkills.map((skill, index) => (
            <SkillDetailCard
              key={skill.title}
              IconComponent={skill.icon}
              title={skill.title}
              description={skill.description}
              index={index}
            />
          ))}
        </div>
      </div>

    </section>
  );
}


