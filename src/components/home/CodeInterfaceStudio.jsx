import { Check, Code2 } from "lucide-react";
import HomeReveal from "./HomeReveal";

const principles = ["Accessible", "Responsive", "Maintainable"];
const source = `const principles = [
${principles.map(principle => `  "${principle}",`).join("\n")}
];

export function Interface() {
  return (
    <Experience
      principles={principles}
      motion="considered"
    />
  );
}`;

export default function CodeInterfaceStudio() {
  return <figure className="code-studio" aria-label="Code-to-Interface Studio">
    <figcaption className="sr-only">A JSX component study alongside its rendered interface. A passive illustration of accessible, responsive and maintainable front-end development.</figcaption>
    <HomeReveal className="studio-header" entrance preset="fade" delay={0.49} duration={0.42}>
      <span className="studio-filename"><Code2 size={15} aria-hidden="true" />interface.jsx</span>
      <span className="studio-status"><span aria-hidden="true" />Preview</span>
    </HomeReveal>
    <div className="studio-body">
      <HomeReveal className="studio-preview" entrance preset="frame" delay={0.6} duration={0.42}>
        <HomeReveal className="studio-canvas" entrance preset="fade" delay={0.63} duration={0.42}>
          <p className="studio-eyebrow">Rendered interface</p>
          <h2>Designed to adapt.</h2>
          <p className="studio-description">Clear structure, accessible interaction, and considered motion.</p>
          <ul aria-label="Interface principles">{principles.map(principle => <li key={principle}><Check size={14} aria-hidden="true" /><span>{principle}</span></li>)}</ul>
        </HomeReveal>
      </HomeReveal>
      <HomeReveal className="studio-code" entrance preset="fade" delay={0.56} duration={0.42}>
        <pre aria-label="JSX example"><code>{source}</code></pre>
      </HomeReveal>
    </div>
  </figure>;
}
