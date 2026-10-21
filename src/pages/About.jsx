import PageMetadata from "../components/PageMetadata";
import { frontendSkills, backendSkills, tools, softSkills } from "../data/skills";
import SkillDetailCard from "../components/SkillDetailCard";
import ExperienceEntry from "../components/ExperienceEntry";
import { profile } from "../data/profile";
import { experiences } from "../data/experience";

/* ---------------- About Component ---------------- */
export default function About() {
  return (
    <section id="about" className="px-6 py-12 md:py-16">
        <PageMetadata title="About | Mikko Pangilinan" description="Learn more about Mikko Pangilinan, a front-end web developer passionate about creating responsive, modern, and user-friendly web experiences." />

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
            className="absolute inset-0"
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
              src="/profile-pic.jpg"
              alt="Profile"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
            />
          </div>

          <div className="mt-6">
            <h2
              className="text-xl md:text-2xl font-semibold transition-all duration-700 hover:tracking-wide"
              style={{ color: "var(--text-color)" }}
            >
              {profile.name}
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

          {profile.aboutParagraphs.slice(0, 2).map(paragraph => (
            <p
              key={paragraph}
              className="text-lg md:text-xl leading-relaxed transition-all duration-700 hover:translate-x-1"
              style={{ color: "var(--text-color)" }}
            >
              {paragraph}
            </p>
          ))}

          {/* Skills Badges */}
          <div className="mt-4 flex flex-wrap gap-4 justify-center md:justify-start">
            {["Front-End", "UI/UX", "Responsive Design"].map((skill) => (
              <span
                key={skill}
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

      <section className="max-w-6xl mx-auto mb-12" aria-labelledby="about-experience-heading">
        <h2 id="about-experience-heading" className="text-2xl md:text-3xl font-semibold mb-6 text-center md:text-left">
          Experience
        </h2>
        {experiences.map(experience => (
          <ExperienceEntry key={experience.id} experience={experience} preview />
        ))}
        {profile.aboutParagraphs.slice(2).map(paragraph => (
          <p
            key={paragraph}
            className="mt-6 text-lg md:text-xl leading-relaxed text-center md:text-left transition-all duration-700 hover:translate-x-1"
            style={{ color: "var(--text-color)" }}
          >
            {paragraph}
          </p>
        ))}
      </section>

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
              iconComponent={skill.icon}
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

