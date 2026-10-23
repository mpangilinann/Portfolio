import { motion as Motion } from "framer-motion";
import { approach } from "../../data/home";
import useReducedMotion from "../../hooks/useReducedMotion";

export default function Approach() {
  const reduced = useReducedMotion();
  return <div className="approach-sequence">
    <div className="approach-progress" aria-hidden="true"><Motion.span initial={reduced ? false : { scaleX: 0 }} whileInView={{ scaleX: 1 }} animate={reduced ? { scaleX: 1 } : undefined} viewport={{ once: true }} transition={{ duration: reduced ? 0 : 0.4 }} /></div>
    <ol>{approach.map(principle => <li key={principle.title}><h3>{principle.title}</h3><p>{principle.description}</p></li>)}</ol>
  </div>;
}
