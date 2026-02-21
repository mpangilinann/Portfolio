import { motion } from "framer-motion";
import { Download, Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import { Helmet } from 'react-helmet';

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
    { title: "Responsive Web Design – freeCodeCamp", link: "https://www.freecodecamp.org/certification/pangilinan_mikko/responsive-web-design" },
    { title: "JavaScript Algorithms and Data Structures – freeCodeCamp", link: "https://www.freecodecamp.org/certification/pangilinan_mikko/javascript-algorithms-and-data-structures" },
    { title: "Back-End Development and APIs – freeCodeCamp", link: "https://www.freecodecamp.org/certification/pangilinan_mikko/back-end-development-and-apis" },
    { title: "Introduction to Graphic Design: Basics of UI/UX – Simplilearn", link: "https://www.simplilearn.com/skillup-certificate-landing?token=eyJjb3Vyc2VfaWQiOiIzNDA1IiwiY2VydGlmaWNhdGVfdXJsIjoiaHR0cHM6XC9cL2NlcnRpZmljYXRlcy5zaW1wbGljZG4ubmV0XC9zaGFyZVwvODY1NzkzOF84MTA5OTU5MTc1MzAyNzIyOTY1OS5wbmciLCJ1c2VybmFtZSI6Ik1pa2tvIFBhbmdpbGluYW4ifQ%3D%3D&utm_source=shared-certificate&utm_medium=lms&utm_campaign=shared-certificate-promotion&referrer=https%3A%2F%2Flms.simplilearn.com%2Fcourses%2F6307%2FIntroduction-to-Graphic-Design%253B-Basics-of-UI%252FUX%2Fcertificate%2Fdownload-skillup&%24web_only=true" },
    { title: "Website UI/UX Designing using ChatGPT – Simplilearn", link: "https://www.simplilearn.com/skillup-certificate-landing?token=eyJjb3Vyc2VfaWQiOiIzMjM3IiwiY2VydGlmaWNhdGVfdXJsIjoiaHR0cHM6XC9cL2NlcnRpZmljYXRlcy5zaW1wbGljZG4ubmV0XC9zaGFyZVwvODc4MTQ1NF84MTA5OTU5MTc1NTEwODA0ODQwNy5wbmciLCJ1c2VybmFtZSI6Ik1pa2tvIFBhbmdpbGluYW4ifQ%3D%3D&utm_source=shared-certificate&utm_medium=lms&utm_campaign=shared-certificate-promotion&referrer=https%3A%2F%2Flms.simplilearn.com%2Fcourses%2F6024%2FWebsite-UI%252FUX-Designing-using-ChatGPT-%3A-Become-a-UI-UX-designer%2Fcertificate%2Fdownload-skillup&%24web_only=true" },
    { title: "Work with Components in Figma – Coursera", link: "https://www.coursera.org/account/accomplishments/verify/RVAYB94ML1CX" },
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
      
      className="min-h-screen pt-24 pb-16 px-6"
      style={{
        backgroundColor: "var(--bg-color)",
        color: "var(--text-color)",
        transition: 'background-color 0.3s, color 0.3s'
      }}
    >

      <Helmet>
        <title>Resume | Mikko Pangilinan</title>
        <meta
          name="description"
          content="View the resume of Mikko Pangilinan, front-end web developer, highlighting skills, experience, projects, and professional accomplishments."
        />
      </Helmet>


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

          {/* View Resume */}
          <a
            href="Mikko Pangilinan - Resume.pdf"
            target="blank"
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
              <ExternalLink className="w-4 h-4" />
              View Resume
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
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                className="group block p-8 border rounded-2xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl transition-colors duration-300" style={{ backgroundColor: "var(--section-bg)", color: "var(--text-color)" }}>
                    <ExternalLink className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2 tracking-tight" style={{ color: "var(--text-color)" }}>{project.title}</h3>
                    <p className="text-sm leading-relaxed opacity-90">{project.description}</p>
                    <p className="text-xs opacity-60 mt-2"><strong>Technologies:</strong> {project.technologies}</p>
                  </div>
                </div>
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
            {certifications.map((cert, index) => (
              <motion.a
                key={cert.title}
                href={cert.link} // temporary clickable link
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
                className="group flex items-center justify-between p-6 border rounded-3xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                style={{ backgroundColor: "var(--section-bg)", borderColor: "var(--card-border)" }}
              >
                <span className="text-sm font-medium">{cert.title}</span>
                <ExternalLink className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-all duration-300" />
              </motion.a>
            ))}
          </div>
        </section>



      </div>
    </motion.div>
  );
}
