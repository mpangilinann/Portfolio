import PageMetadata from "../components/PageMetadata";
import { projects as allProjects } from "../data/projects";
import { certifications } from "../data/certifications";
import { resumeSkills as skills, resumeSoftSkills as softSkills } from "../data/skillLists";
import { contact } from "../data/contact";
import { profile } from "../data/profile";
import { experiences } from "../data/experience";
import ExperienceEntry from "../components/ExperienceEntry";
import { motion as Motion } from "framer-motion";
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";

export default function Resume() {
  const projects = allProjects.filter(project => project.resumeDescription);

  return (
    <Motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-24 pb-16 px-6"
      style={{
        backgroundColor: "var(--bg-color)",
        color: "var(--text-color)",
        transition: 'background-color 0.3s, color 0.3s'
      }}
    >
        <PageMetadata />

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <Motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:justify-between md:items-start mb-12"
        >
          <div>
            <h1 id="page-heading" className="text-5xl font-bold tracking-tight mb-2">
              {profile.name.toUpperCase()}
            </h1>
            <p className="text-xl tracking-wide">
              {profile.title}
            </p>
          </div>

          {/* VIEW RESUME BUTTON */}
          <Motion.a
            href={contact.resumePath}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 md:mt-0 px-6 py-3 rounded-full flex items-center gap-2 shadow-md"
            style={{
              backgroundColor: "var(--text-color)",
              color: "var(--bg-color)",
            }}
          >
            <ExternalLink aria-hidden="true" className="w-4 h-4" />
            View Resume
          </Motion.a>
        </Motion.div>

        <p className="text-sm opacity-70 mb-6">
          The downloadable PDF is the previous version. This page includes my completed IT Support internship.
        </p>

        {/* CONTACT INFO */}
        <Motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="border-t border-b py-6 mb-12 flex flex-wrap gap-6 text-sm"
          style={{ borderColor: "var(--card-border)" }}
        >
          <div className="flex items-center gap-2">
            <Mail aria-hidden="true" className="w-4 h-4" />
            {contact.email}
          </div>
          <div className="flex items-center gap-2">
            <Phone aria-hidden="true" className="w-4 h-4" />
            {contact.phone}
          </div>
          <div className="flex items-center gap-2">
            <MapPin aria-hidden="true" className="w-4 h-4" />
            {contact.location}
          </div>
        </Motion.div>

        {/* SUMMARY */}
        <Motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-4">Professional Summary</h2>
          <div className="h-1 w-16 mb-6"
            style={{ backgroundColor: "var(--text-color)" }} />
          <p className="leading-relaxed opacity-90">
            {profile.resumeSummary}
          </p>
        </Motion.section>

        <Motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mb-16"
          aria-labelledby="resume-experience-heading"
        >
          <h2 id="resume-experience-heading" className="text-2xl font-bold mb-6">Experience</h2>
          {experiences.map(experience => (
            <ExperienceEntry key={experience.id} experience={experience} />
          ))}
        </Motion.section>

        {/* PROJECTS */}
        <Motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold mb-6">Projects Overview</h2>
          <div className="space-y-8">
            {projects.map((project, index) => (
              <Motion.div
                key={project.title}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1, ease: "easeOut" }}
                className="group block p-8 border rounded-2xl hover:shadow-lg motion-safe:hover:-translate-y-1 transition-all duration-300"
                style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl transition-colors duration-300" style={{ backgroundColor: "var(--section-bg)", color: "var(--text-color)" }}>
                    <ExternalLink aria-hidden="true" className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2 tracking-tight" style={{ color: "var(--text-color)" }}>{project.title}</h3>
                    <p className="text-sm leading-relaxed opacity-90">{project.resumeDescription}</p>
                    <p className="text-xs opacity-60 mt-2"><strong>Technologies:</strong> {project.resumeTechnologies}</p>
                  </div>
                </div>
              </Motion.div>
            ))}
          </div>
        </Motion.section>

        {/* SKILLS GRID */}
        <Motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid md:grid-cols-2 gap-12 mb-16"
        >
          {/* Technical Skills */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Technical Skills</h2>
            {Object.entries(skills).map(([category, list]) => (
              <div key={category} className="mb-6">
                <h3 className="font-semibold mb-2">{category}</h3>
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
            <h2 className="text-2xl font-bold mb-6">Professional Skills</h2>
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
        </Motion.section>

        {/* EDUCATION */}
        <Motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold mb-6">Education</h2>
          <div className="p-6 rounded-xl border"
            style={{
              backgroundColor: "var(--card-bg)",
              borderColor: "var(--card-border)",
            }}>
            <p className="font-semibold">
              {profile.education.degree}
            </p>
            <p>{profile.education.institution}</p>
            <p>Expected Graduation: {profile.education.expectedGraduation}</p>
            <p className="mt-2 font-medium">Academic Honors</p>
            <p>{profile.education.honors}</p>
          </div>
        </Motion.section>

        {/* CERTIFICATIONS */}
        <Motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-6">Certifications</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {certifications.map((cert, index) => (
              <Motion.a
                key={cert.title}
                href={cert.link}
                target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.05, ease: "easeOut" }}
              className="group flex items-center justify-between p-6 border rounded-3xl hover:shadow-lg motion-safe:hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              style={{ backgroundColor: "var(--section-bg)", borderColor: "var(--card-border)" }}
            >
              <span className="text-sm font-medium">{cert.title}</span>
              <ExternalLink aria-hidden="true" className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-all duration-300" />
            </Motion.a>
            ))}
          </div>
        </Motion.section>

      </div>
    </Motion.div>
  );
}
