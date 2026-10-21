import { motion as Motion } from "framer-motion";

const SkillDetailCard = ({ svg, title, description, iconComponent, index }) => {
  const IconComponent = iconComponent;
  return (
  <Motion.div
    initial={{ opacity: 0, y: 40, scale: 0.95 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
    viewport={{ once: true }}
    className="group p-6 border rounded-2xl hover:shadow-lg motion-safe:hover:-translate-y-1 transition-all duration-300"
    style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
  >
    <div className="flex items-start gap-4">
      <div aria-hidden="true" className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl">
        {svg ? svg : <IconComponent aria-hidden="true" className="w-6 h-6" style={{ color: "var(--text-color)" }} />}
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-bold mb-2 tracking-tight" style={{ color: "var(--text-color)" }}>{title}</h3>
        <p className="text-sm leading-relaxed" style={{ color: "var(--text-color)" }}>{description}</p>
      </div>
    </div>
  </Motion.div>
  );
};


export default SkillDetailCard;
