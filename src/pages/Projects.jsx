import PageMetadata from "../components/PageMetadata";
import ProjectArchive from "../components/projects/ProjectArchive";
import { ActionLink, Reveal } from "../components/home/Primitives";
import { motionTiming } from "../utils/motion";
import { projects } from "../data/projects";
import { socialLinks } from "../data/socialLinks";
import "../styles/projects.css";

const github = socialLinks.find(link => link.label === "GitHub");

export default function Projects() {
  return <div className="projects-page"><PageMetadata />
    <div className="archive-container">
      <header className="archive-introduction">
        <div><Reveal as="p" className="archive-label" entrance preset="fade">Projects</Reveal>
          <Reveal as="h1" id="page-heading" entrance preset="mask" delay={motionTiming.stagger}>Selected builds and experiments.</Reveal>
          <Reveal as="p" className="archive-description" entrance preset="soft" delay={2 * motionTiming.stagger}>A collection of front-end and full-stack work from academic and collaborative projects.</Reveal>
          <Reveal as="p" className="archive-count" entrance preset="fade" delay={3 * motionTiming.stagger}>{projects.length} projects in the collection</Reveal>
        </div>
      </header>
      <ProjectArchive />
      <section className="archive-closing" aria-labelledby="archive-closing-heading">
        <Reveal as="h2" preset="mask" id="archive-closing-heading">Interested in how something was built?</Reveal>
        <Reveal className="archive-closing-actions" preset="fade" delay={motionTiming.stagger}>
          {github && <ActionLink href={github.url} external>View GitHub</ActionLink>}
          <ActionLink to="/contact" primary>Contact Me</ActionLink>
        </Reveal>
      </section>
    </div>
  </div>;
}
