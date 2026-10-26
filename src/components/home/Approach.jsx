import { motion as Motion } from "framer-motion";
import { approach } from "../../data/home";
import useReducedMotion from "../../hooks/useReducedMotion";
import HomeReveal from "./HomeReveal";
import { homeTiming } from "./homeMotion";

export default function Approach() {
  const reduced = useReducedMotion();
  return <div className="approach-sequence">
    <div className="approach-progress" aria-hidden="true"><Motion.span initial={reduced ? false : { scaleX: 0 }} whileInView={{ scaleX: 1 }} animate={reduced ? { scaleX: 1 } : undefined} viewport={{ once: true }} transition={{ duration: reduced ? 0 : 0.4 }} /></div>
    <ol>{approach.map((principle, index) => <HomeReveal as="li" key={principle.title} delay={(index + 1) * homeTiming.itemStagger}><h3>{principle.title}</h3><p>{principle.description}</p></HomeReveal>)}</ol>
  </div>;
}
