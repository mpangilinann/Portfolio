import { motion } from 'framer-motion';
import { ArrowRight, Download, Code, Database, Layers, ExternalLink } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet';

// ===== ProjectCard Component =====
function ProjectCard({ title, description, image, techStack, index, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="relative overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-2" style={{ backgroundColor: 'var(--card-bg)' }}>
        <div className="aspect-video overflow-hidden relative rounded-t-2xl">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center gap-3 text-white">
              <span className="text-lg font-bold tracking-wider uppercase">View Project</span>
              <ExternalLink className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      <div
        className="p-6 border rounded-b-2xl border-t-0 transition-colors duration-300"
        style={{
          backgroundColor: 'var(--card-bg)',
          borderColor: 'var(--card-border)',
          color: 'var(--text-color)',
        }}
      >
        <h3 className="relative text-xl font-bold mb-3 tracking-tight">
          {title}
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300" style={{ backgroundColor: 'var(--text-color)' }} />
        </h3>
        <p className="mb-4 text-sm leading-relaxed">{description}</p>
        <div className="flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs border rounded-full tracking-wide transition-all duration-300"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--card-border)',
                color: 'var(--text-color)',
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ===== ServiceCard Component =====
function ServiceCard({ icon: Icon, title, description, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative p-8 border-2 rounded-2xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
      style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)', color: 'var(--text-color)' }}
    >
      <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-12 h-12" strokeWidth={1.5} style={{ color: 'var(--text-color)' }} />
      </div>
      <h3 className="text-xl font-bold mb-3 tracking-tight">{title}</h3>
      <p className="leading-relaxed">{description}</p>
      <div className="absolute bottom-0 left-0 right-0 h-1 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-b-2xl" style={{ background: 'linear-gradient(to right, var(--text-color), var(--text-color))' }} />
    </motion.div>
  );
}

// ===== SkillsMarquee Component =====
function SkillsMarquee() {
  const skills = [
    'HTML', 'CSS', 'JavaScript', 'React', 'Vue.js', 'Angular', 'Node.js',
    'Express', 'MongoDB', 'Git', 'Figma', 'Tailwind CSS', 'TypeScript'
  ];

  return (
    <div className="relative overflow-hidden py-4">
      <div className="flex gap-4">
        <motion.div
          className="flex gap-4 flex-shrink-0"
          animate={{ x: [0, -1000] }}
          transition={{ x: { repeat: Infinity, repeatType: "loop", duration: 20, ease: "linear" } }}
        >
          {[...skills, ...skills].map((skill, index) => (
            <div
              key={index}
              className="px-6 py-2 border rounded-full whitespace-nowrap text-sm tracking-wider hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)', color: 'var(--text-color)' }}
            >
              {skill}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

// ===== ScrollIndicator Component =====
function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1, repeat: Infinity, repeatType: "reverse" }}
      className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      style={{ color: 'var(--text-color)' }}
    >
      <span className="text-xs tracking-widest uppercase">Scroll</span>
      <div className="w-0.5 h-8" style={{ backgroundColor: 'var(--text-color)' }} />
    </motion.div>
  );
}

// ===== Main Home Component =====
export default function Home() {
  const navigate = useNavigate();
  const projects = [
    {
      id: 1,
      title: 'Thryve',
      description: 'A comprehensive wellness platform that helps users track daily health goals, monitor vital statistics, and visualize progress over time.',
      image: '',
      techStack: ['VueJS', 'Tailwind CSS', 'MongoDB']
    },
    {
      id: 2,
      title: 'The Coffee Lab & Lounge',
      description: 'An elegant e-commerce platform for a specialty coffee shop, showcasing its menu, ambiance, and unique offerings to attract customers.',
      image: '',
      techStack: ['HTML', 'CSS', 'JavaScript']
    },
    {
      id: 3,
      title: 'TechQuest Job',
      description: 'A modern job board for tech professionals, providing curated job listings, resume guidance, and practical interview tips for career growth.',
      image: '',
      techStack: ['HTML', 'CSS', 'JavaScript']
    }
  ];

  const services = [
    { icon: Code, title: 'UI Development', description: 'Building responsive and accessible interfaces with clean structure and strong visual hierarchy.' },
    { icon: Layers, title: 'Interactive Web Apps', description: 'Developing dynamic front-end experiences using modern JavaScript frameworks.' },
    { icon: Database, title: 'Backend Integration', description: 'Connecting front-end interfaces with databases and APIs for full functionality.' }
  ];

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)', transition: 'background-color 0.3s, color 0.3s' }}>

      {/* ✅ Helmet goes here */}
      <Helmet>
        <title>Home | Mikko Pangilinan</title>
        <meta name="description" content="Front-end developer portfolio of Mikko Pangilinan." />
      </Helmet>

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



        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto text-center relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-4">
              MIKKO E. PANGILINAN
            </h1>

            <div
              className="h-0.5 w-32 mx-auto mb-6 rounded-full"
              style={{ backgroundColor: "var(--text-color)" }}
            />

            <p className="text-xl md:text-2xl tracking-widest uppercase mb-12">
              Front-End Web Developer
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Building responsive, user-friendly, and modern web experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <motion.button
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
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <a
                href="Mikko Pangilinan - Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 tracking-widest uppercase text-sm font-medium rounded-full flex items-center justify-center gap-2 transition-all duration-300 w-full sm:w-auto"
                  style={{
                    border: "2px solid var(--text-color)",
                    color: "var(--text-color)",
                  }}
                >
                  View Resume
                  <ExternalLink className="w-4 h-4" />
                </motion.button>
              </a>
            </div>
          </motion.div>
        </motion.div>

        <ScrollIndicator />
      </section>


      {/* Services Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="mb-16 text-center">
            <h2 className="text-5xl md:text-6xl font-bold tracking-tighter mb-4">WHAT I DO</h2>
            <div className="h-0.5 w-24 mx-auto rounded-full" style={{ backgroundColor: 'var(--text-color)' }} />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={service.title} icon={service.icon} title={service.title} description={service.description} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Skills Marquee Section */}
      <section className="skills-marquee py-12 border-y" style={{ backgroundColor: 'var(--section-bg)', borderColor: 'var(--card-border)', backgroundColor: 'var(--skills-marquee-color)', }}>
        <div className="mb-8 text-center">
          <h3 className="text-2xl font-bold tracking-wider uppercase mb-2">TECH STACK</h3>
        </div>
        <SkillsMarquee />
      </section>

      {/* Featured Projects Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
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
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                image={project.image}
                techStack={project.techStack}
                index={index}
                onClick={() => navigate("/projects", { state: { openProjectId: project.id } })}
              />
            ))}
          </div>

          {/* Centered button */}
          <div className="mt-12 flex justify-center">
            <motion.button onClick={() => navigate("/projects")} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="group px-8 py-4 tracking-widest uppercase text-sm font-medium rounded-full flex items-center justify-center gap-2" style={{ backgroundColor: 'var(--text-color)', color: 'var(--bg-color)', transition: 'all 0.3s' }}>
              View All Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        </div>
      </section>


      {/* Call to Action Section */}
      <section
        className="cta-section py-24 px-6 transition-colors duration-300"
        style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)", backgroundColor: 'var(--cta-section)', }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
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
              <motion.button
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
              </motion.button>

              {/* View Resume Button */}
              <a
                href="Mikko Pangilinan - Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 tracking-widest uppercase text-sm font-medium rounded-full flex items-center justify-center gap-2 transition-all duration-300 w-full sm:w-auto"
                  style={{
                    border: "2px solid var(--text-color)",
                    color: "var(--text-color)",
                  }}
                >
                  View Resume
                  <ExternalLink className="w-4 h-4" />
                </motion.button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
