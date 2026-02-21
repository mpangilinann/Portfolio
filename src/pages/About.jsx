import { motion } from "framer-motion";
import { Users, Lightbulb, Clock, Target } from "lucide-react";
import { Helmet } from 'react-helmet';

/* Icon Imports */
import { FaHtml5, FaCss3, FaJsSquare, FaAngular, FaBootstrap, FaNodeJs, FaPhp, FaGitAlt, FaGithub, FaFigma, FaWordpress } from "react-icons/fa";
import { RiTailwindCssFill, RiVuejsFill } from "react-icons/ri";
import { SiExpress, SiMysql, SiMongodb, SiCanva } from "react-icons/si";
import { BiLogoVisualStudio } from "react-icons/bi";

/* ---------------- Icons using CSS Variables for color ---------------- */
const Icons = {
  HTML: <span style={{ color: "var(--text-color)" }} className="w-6 h-6 flex items-center justify-center"><FaHtml5 className="w-full h-full" /></span>,
  CSS: <span style={{ color: "var(--text-color)" }} className="w-6 h-6 flex items-center justify-center"><FaCss3 className="w-full h-full" /></span>,
  JavaScript: <span style={{ color: "var(--text-color)" }} className="w-6 h-6 flex items-center justify-center"><FaJsSquare className="w-full h-full" /></span>,
  Tailwind: <span style={{ color: "var(--text-color)" }} className="w-6 h-6 flex items-center justify-center"><RiTailwindCssFill className="w-full h-full" /></span>,
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

/* ---------------- Skill Card ---------------- */
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
      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl">
        {svg ? svg : <IconComponent className="w-6 h-6" style={{ color: "var(--text-color)" }} />}
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


