import { motion as Motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

export default function ProjectCard({ title, description, image, techStack, index, onClick }) {
  return (
    <Motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group cursor-pointer"
      role="button"
      tabIndex={0}
      onKeyDown={event => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          (onClick)();
        }
      }}
      onClick={onClick}
    >
      <div className="relative overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-2" style={{ backgroundColor: 'var(--card-bg)' }}>
        <div className="aspect-video overflow-hidden relative rounded-t-2xl">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
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
    </Motion.div>
  );
}

