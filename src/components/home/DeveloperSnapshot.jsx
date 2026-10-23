import { motion as Motion } from "framer-motion";
import { MapPin } from "lucide-react";
import AvailabilityIndicator from "../AvailabilityIndicator";
import { ActionLink } from "./Primitives";
import { contact } from "../../data/contact";
import { homeLocation } from "../../data/home";
import usePointerSurface from "../../hooks/usePointerSurface";

export default function DeveloperSnapshot() {
  const surface = usePointerSurface({ tilt: .6, shift: 2 });

  return <div className="snapshot-depth" {...surface}>
    <Motion.aside className="developer-snapshot" aria-labelledby="snapshot-heading" style={{ rotateX: "var(--tilt-x, 0deg)", rotateY: "var(--tilt-y, 0deg)" }}>
      <p className="snapshot-label">Developer Snapshot</p>
      <h2 id="snapshot-heading">Front-End Development</h2>
      <p className="snapshot-degree">BSIT — Web Development</p>
      <Motion.div className="snapshot-focus" style={{ x: "var(--shift-x, 0px)", y: "var(--shift-y, 0px)" }}><p>Current focus</p><h3><span>Accessible.</span>{" "}<span>Maintainable.</span></h3><p>React, TypeScript, and modern web development.</p></Motion.div>
      <p className="snapshot-location"><MapPin size={15} aria-hidden="true" />Based in {homeLocation}</p>
      <div className="snapshot-footer"><AvailabilityIndicator /><ActionLink href={contact.resumePath} external>View Résumé</ActionLink></div>
    </Motion.aside>
  </div>;
}
