import PageMetadata from "../components/PageMetadata";
import ProjectArchive from "../components/projects/ProjectArchive";
import { ActionLink, Reveal } from "../components/home/Primitives";
import { projects } from "../data/projects";
import { socialLinks } from "../data/socialLinks";
import "../styles/projects.css";

const github = socialLinks.find(link => link.label === "GitHub");

export default function Projects() {
  return <div className="projects-page"><PageMetadata />
    <div className="archive-container">
      <header className="archive-introduction">
        <Reveal><p className="archive-label">Projects</p>
          <h1 id="page-heading">Selected builds and experiments.</h1>
          <p className="archive-description">A collection of front-end and full-stack work from academic and collaborative projects.</p>
          <p className="archive-count">{projects.length} projects in the collection</p>
        </Reveal>
      </header>
      <ProjectArchive />
      <section className="archive-closing" aria-labelledby="archive-closing-heading">
        <h2 id="archive-closing-heading">Interested in how something was built?</h2>
        <div className="archive-closing-actions">
          {github && <ActionLink href={github.url} external>View GitHub</ActionLink>}
          <ActionLink to="/contact" primary>Contact Me</ActionLink>
        </div>
      </section>
    </div>
  </div>;
}
