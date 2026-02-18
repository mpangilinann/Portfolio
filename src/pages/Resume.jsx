import { motion } from "framer-motion";
import { Download, Mail, Phone, MapPin, ExternalLink } from "lucide-react";

export default function Resume() {
  const projects = [
    {
      title: "Thryve",
      description:
        "A fitness and wellness web application featuring activity tracking for meals, workouts, sleep, and hydration. Contributed as a front-end developer, focusing on the Meals module by implementing an interactive interface for logging, displaying, and managing nutrition data. Utilized Vue.js with PrimeVue components to improve UI consistency, data presentation, and overall user experience.",
      technologies: "HTML, CSS, JavaScript, Vue.js, PrimeVue",
      link: "#", // TODO: Add live project link
    },
    {
      title: "The Coffee Lab & Lounge",
      description:
        "A modern café website showcasing an interactive digital menu with CRUD functionality, search, and category-based sorting. Built to support dynamic menu management and smooth user interaction, with a fully functional contact form integrated using Formspree.",
      technologies: "HTML, CSS, JavaScript",
      link: "#", // TODO: Add live project link
    },
    {
      title: "TechQuest Job",
      description:
        "A front-end web platform for exploring tech job opportunities and career resources. Designed with a clean, responsive layout and structured navigation to provide job listings, resume tips, interview guidance, and career development content for tech professionals.",
      technologies: "HTML, CSS, JavaScript",
      link: "#", // TODO: Add live project link
    },
  ];

  const certifications = [
    { title: "Responsive Web Design – freeCodeCamp", link: "#" },
    { title: "JavaScript Algorithms and Data Structures – freeCodeCamp", link: "#" },
    { title: "Back-End Development and APIs – freeCodeCamp", link: "#" },
    { title: "Introduction to Graphic Design: Basics of UI/UX – Simplilearn", link: "#" },
    { title: "Website UI/UX Designing using ChatGPT – Simplilearn", link: "#" },
    { title: "Work with Components in Figma – Coursera", link: "#" },
  ];

  const skills = {
    frontend: ["HTML5", "CSS3", "JavaScript", "Tailwind CSS", "Vue.js", "Angular", "Bootstrap"],
    backend: ["Node.js", "Express.js", "PHP", "MySQL", "MongoDB"],
    tools: ["Figma", "Canva", "Git", "GitHub", "WordPress", "Visual Studio Code"],
  };

  const softSkills = [
    "Attention to Detail",
    "Adaptability",
    "Time Management",
    "Teamwork",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.995 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="min-h-screen pt-24 pb-16 px-6"
      style={{
        backgroundColor: "var(--bg-color)",
        color: "var(--text-color)",
      }}
    >
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:justify-between md:items-start mb-12"
        >
          <div>
            <h1 className="text-5xl font-bold tracking-tight mb-2">
              MIKKO E. PANGILINAN
            </h1>
            <p className="text-xl tracking-wide">
              Front-end Web Developer
            </p>
          </div>

          {/* Download Resume */}
          <a
            href="Mikko Pangilinan - Resume.pdf" // TODO: Replace with actual PDF path
            download="Mikko Pangilinan - Resume.pdf" // This sets the downloaded file name
            rel="noopener noreferrer"
          >
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 md:mt-0 px-6 py-3 rounded-full flex items-center gap-2 shadow-md"
              style={{
                backgroundColor: "var(--text-color)",
                color: "var(--bg-color)",
              }}
            >
              <Download className="w-4 h-4" />
              Download Resume
            </motion.button>
          </a>
        </motion.div>

        {/* CONTACT */}
        <div className="border-t border-b py-6 mb-12 flex flex-wrap gap-6 text-sm"
          style={{ borderColor: "var(--card-border)" }}>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            mikkopangilinan39@gmail.com
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            +63 919-823-9874
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            267 Sto. Tomas St. Sta Cruz, Porac, Pampanga
          </div>
        </div>

        {/* SUMMARY */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Professional Summary</h2>
          <div className="h-1 w-16 mb-6"
            style={{ backgroundColor: "var(--text-color)" }} />
          <p className="leading-relaxed opacity-90">
            Aspiring front-end developer looking for an internship opportunity to apply practical web development skills in building responsive and user-friendly interfaces. Committed to learning through real projects, improving UI/UX implementation, and contributing positively to team-based development environments.
          </p>
        </section>

        {/* PROJECTS */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Projects Overview</h2>
          <div className="space-y-8">
            {projects.map((project, index) => (
              <motion.a
                key={project.title}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="block p-8 rounded-2xl border transition-all duration-300 hover:shadow-md"
                style={{
                  backgroundColor: "var(--card-bg)",
                  borderColor: "var(--card-border)",
                }}
              >


                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 group-hover:tracking-wide transition-all duration-500">
                  {project.title}
                  <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100 transition duration-500" />
                </h3>

                <p className="mb-3 text-sm opacity-90">{project.description}</p>
                <p className="text-xs opacity-60">
                  <strong>Technologies:</strong> {project.technologies}
                </p>
              </motion.a>
            ))}
          </div>
        </section>

        {/* SKILLS GRID */}
        <section className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Technical Skills */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Technical Skills</h2>
            {Object.entries(skills).map(([category, list]) => (
              <div key={category} className="mb-6">
                <h3 className="font-semibold capitalize mb-2">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {list.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-sm rounded-full border transition-all duration-300 hover:opacity-80"
                      style={{
                        backgroundColor: "var(--section-bg)",
                        borderColor: "var(--card-border)",
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Soft Skills */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Soft Skills</h2>
            <div className="flex flex-wrap gap-2">
              {softSkills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 text-sm rounded-full border transition-all duration-300 hover:opacity-80"
                  style={{
                    backgroundColor: "var(--section-bg)",
                    borderColor: "var(--card-border)",
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>


        {/* EDUCATION */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Education</h2>
          <div className="p-6 rounded-xl border"
            style={{
              backgroundColor: "var(--card-bg)",
              borderColor: "var(--card-border)",
            }}>
            <p className="font-semibold">
              Bachelor of Science in Information Technology Major in Web Development
            </p>
            <p>Holy Angel University</p>
            <p>Expected Graduation: 2027</p>
            <p className="mt-2 font-medium">Academic Honors</p>
            <p>Dean’s Lister (2024 – present)</p>
          </div>
        </section>

        {/* CERTIFICATIONS */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Certifications</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {certifications.map((cert) => (
              <motion.a
                key={cert.title}
                href={cert.link} // temporary clickable link
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="flex items-center justify-between p-6 rounded-3xl border transition-all duration-300 cursor-pointer"
                whileHover={{ scale: 1.03, boxShadow: "0 10px 25px rgba(0,0,0,0.15)" }}
                style={{
                  backgroundColor: "var(--section-bg)",
                  borderColor: "var(--card-border)",
                }}
              >
                <span className="text-sm font-medium">{cert.title}</span>
                <ExternalLink className="w-5 h-5 opacity-70 transition-all duration-100 group-hover:opacity-100" />
              </motion.a>
            ))}
          </div>
        </section>


      </div>
    </motion.div>
  );
}
