import PageMetadata from "../components/PageMetadata";
import ProjectCard from "../components/FeaturedProjectCard";
import { projects as allProjects } from "../data/projects";
import { marqueeSkills as skills } from "../data/skillLists";
import { contact } from "../data/contact";
import { profile } from "../data/profile";
import { motion as Motion, MotionConfig } from 'framer-motion';
import useReducedMotion from "../hooks/useReducedMotion";
import { useState, useRef, useCallback } from "react";
import ProjectDialog from "../components/ProjectDialog";
import { ArrowRight, Code, Database, Layers, ExternalLink } from 'lucide-react';
import { useNavigate } from "react-router-dom";

// ===== ServiceCard Component =====
function ServiceCard({ icon, title, description, index }) {
  const Icon = icon;
  return (
    <Motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative p-8 border-2 rounded-2xl hover:shadow-2xl motion-safe:hover:-translate-y-2 transition-all duration-300"
      style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)', color: 'var(--text-color)' }}
    >
      <div className="mb-6 transform motion-safe:group-hover:scale-110 transition-transform duration-300">
        <Icon aria-hidden="true" className="w-12 h-12" strokeWidth={1.5} style={{ color: 'var(--text-color)' }} />
      </div>
      <h3 className="text-xl font-bold mb-3 tracking-tight">{title}</h3>
      <p className="leading-relaxed">{description}</p>
      <div className="absolute bottom-0 left-0 right-0 h-1 scale-x-0 motion-safe:group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-b-2xl" style={{ background: 'linear-gradient(to right, var(--text-color), var(--text-color))' }} />
    </Motion.div>
  );
}

// ===== SkillsMarquee Component =====
function SkillsMarquee() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="relative overflow-hidden py-4">
      <div className="flex gap-4">
        <Motion.div
          className={`skills-marquee-track flex gap-4 ${reducedMotion ? "flex-wrap justify-center px-6" : "flex-shrink-0"}`}
          animate={reducedMotion ? { x: 0 } : { x: [0, -1000] }}
          transition={reducedMotion ? { duration: 0 } : { x: { repeat: Infinity, repeatType: "loop", duration: 20, ease: "linear" } }}
        >
          {(reducedMotion ? skills : [...skills, ...skills]).map((skill, index) => (
            <div
              key={index}
              aria-hidden={!reducedMotion && index >= skills.length ? "true" : undefined}
              className="px-6 py-2 border rounded-full whitespace-nowrap text-sm tracking-wider hover:shadow-lg motion-safe:hover:-translate-y-1 transition-all duration-300"
              style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)', color: 'var(--text-color)' }}
            >
              {skill}
            </div>
          ))}
        </Motion.div>
      </div>
    </div>
  );
}

// ===== ScrollIndicator Component =====
function ScrollIndicator() {
  const reducedMotion = useReducedMotion();
  return (
    <Motion.div
      aria-hidden="true"
      initial={reducedMotion ? false : { opacity: 0, y: -10 }}
      animate={reducedMotion ? { opacity: 1, y: 0 } : { opacity: [0, 1], y: [-10, 0] }}
      transition={reducedMotion ? { duration: 0 } : { duration: 0.8, delay: 1, repeat: Infinity, repeatType: "reverse" }}
      className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      style={{ color: 'var(--text-color)' }}
    >
      <span className="text-xs tracking-widest uppercase">Scroll</span>
      <div className="w-0.5 h-8" style={{ backgroundColor: 'var(--text-color)' }} />
    </Motion.div>
  );
}

// ===== Main Home Component =====
export default function Home() {
  const navigate = useNavigate();
  const projects = allProjects.filter(project => project.featured);
  const [selectedProject, setSelectedProject] = useState(null);
  const openerRef = useRef(null);
  const closeProject = useCallback(() => setSelectedProject(null), []);

  const services = [
    { icon: Code, title: 'UI Development', description: 'Building responsive and accessible interfaces with clean structure and strong visual hierarchy.' },
    { icon: Layers, title: 'Interactive Web Apps', description: 'Developing dynamic front-end experiences using modern JavaScript frameworks.' },
    { icon: Database, title: 'Backend Integration', description: 'Connecting front-end interfaces with databases and APIs for full functionality.' }
  ];

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)', transition: 'background-color 0.3s, color 0.3s' }}>
        <PageMetadata />

      {/* Hero Section */}
      <section
        className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden transition-colors duration-300"
        style={{ backgroundColor: "var(--bg-color)" }}
      >
        {/* Advanced Grid Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">

          {/* Base Grid */}
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

          {/* Diagonal Lines Overlay */}
          <div
            className="absolute inset-0 diagonal-lines"
            style={{
              backgroundImage: `
        repeating-linear-gradient(
          45deg,
          var(--text-color),
          var(--text-color) 1px,
          transparent 1px,
          transparent 80px
        )
      `,
              opacity: 0.05,
            }}
          />

          {/* Radial Fade for Depth */}
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(circle at center, transparent 40%, var(--bg-color) 85%)",
            }}
          />

        </div>

        <Motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto text-center relative z-10"
        >
          <Motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <h1 id="page-heading" className="text-6xl md:text-8xl font-bold tracking-tighter mb-4">
              {profile.name.toUpperCase()}
            </h1>

            <div
              className="h-0.5 w-32 mx-auto mb-6 rounded-full"
              style={{ backgroundColor: "var(--text-color)" }}
            />

            <p className="text-xl md:text-2xl tracking-widest uppercase mb-12">
              {profile.title}
            </p>
          </Motion.div>

          <Motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            {profile.homeSupportingText}
          </Motion.p>

          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Motion.button
                onClick={() => navigate("/projects")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group px-8 py-4 tracking-widest uppercase text-sm font-medium rounded-full flex items-center justify-center gap-2 transition-all duration-300 w-full sm:w-auto"
                style={{
                  backgroundColor: "var(--text-color)",
                  color: "var(--bg-color)",
                }}
              >
                View Projects
                <ArrowRight aria-hidden="true" className="w-4 h-4 motion-safe:group-hover:translate-x-1 transition-transform" />
              </Motion.button>

              <Motion.a
                href={contact.resumePath}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 tracking-widest uppercase text-sm font-medium rounded-full flex items-center justify-center gap-2 transition-all duration-300 w-full sm:w-auto"
                style={{
                  border: "2px solid var(--text-color)",
                  color: "var(--text-color)",
                }}
              >
                View Resume
                <ExternalLink aria-hidden="true" className="w-4 h-4" />
              </Motion.a>
            </div>
          </Motion.div>
        </Motion.div>

        {/* Continuous motion uses the live preference hook instead of a mount-time snapshot. */}
        <MotionConfig reducedMotion="never"><ScrollIndicator /></MotionConfig>
      </section>

      {/* Services Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <Motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="mb-16 text-center">
            <h2 className="text-5xl md:text-6xl font-bold tracking-tighter mb-4">WHAT I DO</h2>
            <div className="h-0.5 w-24 mx-auto rounded-full" style={{ backgroundColor: 'var(--text-color)' }} />
          </Motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={service.title} icon={service.icon} title={service.title} description={service.description} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Skills Marquee Section */}
      <section className="skills-marquee py-12 border-y" style={{ borderColor: 'var(--card-border)', backgroundColor: 'var(--skills-marquee-color)', }}>
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold tracking-wider uppercase mb-2">TECH STACK</h2>
        </div>
        <MotionConfig reducedMotion="never"><SkillsMarquee /></MotionConfig>
      </section>

      {/* Featured Projects Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="text-5xl md:text-6xl font-bold tracking-tighter mb-4">
              FEATURED PROJECTS
            </h2>
            <div
              className="h-0.5 w-24 mx-auto rounded-full"
              style={{ backgroundColor: 'var(--text-color)' }}
            />
          </Motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.featuredDescription ?? project.description}
                image={project.image}
                techStack={project.featuredTechnologies ?? project.technologies}
                index={index}
                onClick={event => {
                  openerRef.current = event.currentTarget;
                  setSelectedProject(project.id);
                }}
              />
            ))}
          </div>

          {/* Centered button */}
          <div className="mt-12 flex justify-center">
            <Motion.button onClick={() => navigate("/projects")} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="group px-8 py-4 tracking-widest uppercase text-sm font-medium rounded-full flex items-center justify-center gap-2" style={{ backgroundColor: 'var(--text-color)', color: 'var(--bg-color)', transition: 'all 0.3s' }}>
              View All Projects
              <ArrowRight aria-hidden="true" className="w-4 h-4 motion-safe:group-hover:translate-x-1 transition-transform" />
            </Motion.button>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section
        className="cta-section py-24 px-6 transition-colors duration-300"
        style={{ color: "var(--text-color)", backgroundColor: 'var(--cta-section)', }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8 leading-tight">
              Let's Build Something<br />Meaningful.
            </h2>
            <div
              className="h-0.5 w-32 mx-auto mb-12 rounded-full transition-colors duration-300"
              style={{ backgroundColor: "var(--text-color)" }}
            />
            <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
              {/* Contact Me Button */}
              <Motion.button
                onClick={() => navigate("/contact")}
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 rounded-full tracking-widest uppercase text-sm font-medium transition-all duration-300 w-full sm:w-auto"
                style={{
                  backgroundColor: "var(--text-color)",
                  color: "var(--bg-color)",
                }}
              >
                Contact Me
              </Motion.button>

              {/* View Resume Button */}
              <Motion.a
                href={contact.resumePath}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 tracking-widest uppercase text-sm font-medium rounded-full flex items-center justify-center gap-2 transition-all duration-300 w-full sm:w-auto"
                style={{
                  border: "2px solid var(--text-color)",
                  color: "var(--text-color)",
                }}
              >
                View Resume
                <ExternalLink aria-hidden="true" className="w-4 h-4" />
              </Motion.a>
            </div>
          </Motion.div>
        </div>
      </section>

      <ProjectDialog currentProject={allProjects.find(project => project.id === selectedProject)} onClose={closeProject} returnFocusRef={openerRef} />
    </div>
  );
}
