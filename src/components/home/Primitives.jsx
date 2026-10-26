import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
export { default as Reveal } from "../motion/Reveal";

export function SectionHeading({ id, title, children }) {
  return <div className="section-heading"><h2 id={id}>{title}</h2>{children && <p>{children}</p>}</div>;
}

export function ActionLink({ to, href, children, primary = false, external = false }) {
  const props = { className: `soft-button${primary ? " is-primary" : ""}`, ...(external ? { target: "_blank", rel: "noopener noreferrer", "aria-label": `${children} (opens in a new tab)` } : {}) };
  const content = <>{children}<ArrowUpRight size={17} aria-hidden="true" /></>;
  return to ? <Link to={to} {...props}>{content}</Link> : <a href={href} {...props}>{content}</a>;
}
