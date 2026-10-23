import { motion as Motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import useReducedMotion from "../../hooks/useReducedMotion";

export function Reveal({ children, className = "" }) {
  const reduced = useReducedMotion();
  return <Motion.div className={className} initial={reduced ? false : { y: 10 }} whileInView={{ y: 0 }} animate={reduced ? { y: 0 } : undefined} viewport={{ once: true, amount: 0.1 }} transition={{ duration: reduced ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}>{children}</Motion.div>;
}

export function SectionHeading({ id, title, children }) {
  return <div className="section-heading"><h2 id={id}>{title}</h2>{children && <p>{children}</p>}</div>;
}

export function ActionLink({ to, href, children, primary = false, external = false }) {
  const props = { className: `soft-button${primary ? " is-primary" : ""}`, ...(external ? { target: "_blank", rel: "noopener noreferrer", "aria-label": `${children} (opens in a new tab)` } : {}) };
  const content = <>{children}<ArrowUpRight size={17} aria-hidden="true" /></>;
  return to ? <Link to={to} {...props}>{content}</Link> : <a href={href} {...props}>{content}</a>;
}
